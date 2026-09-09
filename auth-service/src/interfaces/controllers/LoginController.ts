import { AuthRepository } from '../database/AuthRepository'
import { CaptchaRepository } from '../database/CaptchaRepository'
import { GenerateToken } from '../../application/usecases/GenerateJwtToken'
import { VerifyJwtTokens } from '../../application/usecases/VerifyJwtToken'
import { CaptchaUseCase } from '../../application/usecases/Captcha'
import { LoginIn, Auth, Captcha } from '../../domain/index';
import { MongoConnection } from '../../infrastructure/MongoConnection'
import { AuthMongoConnection } from '../../infrastructure/helper/database/Auth'
import { CaptchaMongoConnection } from '../../infrastructure/helper/database/Captcha'
import { Response } from '../response/Response'
import { Controller, Get, Route, Example, Post, Body, Header, Request, Query } from "tsoa"
import { UserService } from "../services/User.service"
import { IJwtToken, ILogin, ILogout, IOtpVerify, IPush2FA, IResendOtp, IResetPassword, IVerifyUser } from "../../domain/login/loginInterface"
import { Util2FA } from '../utils/2FA';
import { CaptchaUtils } from '../utils/Captcha';
import { APIValidator } from '../utils/Validator';
import fs from "fs";
import mime from "mime";
import { Utils } from '../utils/Utils'
new MongoConnection()
@Route('auth')
export class LoginController extends Controller {
  private authRepository: AuthRepository;
  private captchaRepository: CaptchaRepository;
  whitelistEmail: any = process.env.WHITELIST_USER?.split(", ")
  constructor() {
    super();
    this.authRepository = new AuthRepository(new AuthMongoConnection())
    this.captchaRepository = new CaptchaRepository(new CaptchaMongoConnection())
  }

  /**
 * Login with included with captcha and id .
 */
  @Post("login")
  @Example({
    "success": "true",
    "error": [],
    "data": {
    }
  })
  async login(@Body() request: ILogin) {
    //validate API
    let validate_res: any = new APIValidator().validateLoginAPI(request)
    if (!validate_res?.status) {
      this.setStatus(400)
      return new Response().sendResponseFailure(validate_res.message, false, 400);
    }
    // TODO use promises
    try {
      const captchaUseCase = new CaptchaUseCase(this.captchaRepository);
      let captchaData = await captchaUseCase.verify(request.id);
      if (captchaData) {
        if (captchaData.captcha === request.captcha) {
          captchaUseCase.destroyCaptcha(request.id)
          const userservice = new UserService();
          let user = await userservice.getUserByEmailPassword(request.email, request.password)
          if (!user.success) return new Response().sendResponseFailure("username / password incorrect", false);
          if (user && user.data) user = user.data;
          let dept_res = await userservice.getOrgByDepartmentId(user.departmentId);
          let type = dept_res.data.type
          let otp = new Util2FA().generateNewToken()
          let data = {
            uuid: user.uuid, email: request.email, userAgent: "useragent", ipAddress: "", jwtToken: '', type: type, captchaVerify: true, otp: otp
          };
          const token = new GenerateToken(this.authRepository);
          let jwt = await new Auth().generateJwtToken(data, token);
          //mobile 2fa 
          let receipt = <any>[];
          let otp_generate_time = new Date();
          let saveOtp = await token.saveOtp({ loginId: jwt.loginId, otp: otp, email: request.email, otp_generate_time: otp_generate_time })
          if (saveOtp) {
            new Util2FA().sendMail(otp, receipt, jwt.jwtToken)
            new Util2FA().sendOtp({ otp, receipt })
            return new Response().sendResponseSuccess({ uuid: jwt.uuid, id: jwt.loginId, remaining: 90, attempt_remaining: 3, now: otp_generate_time }, true);
          } else {
            return new Response().sendResponseSuccess("error while generating otp", true);
          }
        }
      } else {
        return new Response().sendResponseFailure("not valid", false);
      }

    } catch (Error: any) {
      return new Response().sendResponseFailure(Error.message, false);
    }
  }




  //verify otp
  @Post("verify-otp")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async verifyOtp(@Body() request: IOtpVerify) {
    if (!request.uuid) {
      this.setStatus(400);
      return new Response().sendResponseFailure("uuid missing", false);
    }
    if (!request.otp) {
      this.setStatus(400);
      return new Response().sendResponseFailure("Code missing", false);
    }
    try {
      // (Removed a captcha re-check that looked up captchas by
      // request.uuid — the login-session/loginId, not the original captcha
      // id from /login, which IOtpVerify never carries. That lookup can
      // never find a record, so this unconditionally rejected every
      // verify-otp call. The OTP/attempt/expiry checks below already gate
      // this endpoint correctly.)
      const authUseCase = new VerifyJwtTokens(this.authRepository);
      let verify_otp_res = await authUseCase.verifyOtp({ uuid: request.uuid });
      if (verify_otp_res) {
        if (verify_otp_res.attempt >= 3) {
          return new Response().sendResponseFailure({ status: "attempt_complete", message: "Code attempt failed please raise a support ticket", attempt_remaining: 0 }, true);
        }
        if (verify_otp_res.otp != request.otp) {
          await new GenerateToken(this.authRepository).saveAttempt({ uuid: request.uuid, attempt: verify_otp_res.attempt + 1 });
          return new Response().sendResponseFailure({ status: "code_invalid", message: "Code Invalid", "attempt_remaining": 3 - (verify_otp_res.attempt + 1) }, true);
        }
        let verify = await new Util2FA().verifyToken(verify_otp_res.otp_generate_time);
        let newJwtToken = new Auth().generateNewJwtToken({ data: request.uuid });
        const jwtTokenUseCase = new GenerateToken(this.authRepository);
        await jwtTokenUseCase.updateJwtToken(newJwtToken, request.uuid)
        if (verify) {
          return new Response().sendResponseSuccess({
            uuid: verify_otp_res.uuid, userAgent: "useragent", ipAddress: "", jwtToken: newJwtToken, type: verify_otp_res.type
          }, true);
        } else {
          return new Response().sendResponseFailure({ status: "code_expire", message: "Code expired" }, true);
        }
      } else {
        return new Response().sendResponseFailure({ status: "no_user", message: "user not found" }, true);
      }
    } catch (Error: any) {
      return new Response().sendResponseFailure({ message: Error.message }, false);
    }
  }


  //resend otp
  @Post("resend-otp")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async resendOtp(@Body() request: IResendOtp) {
    if (!request.uuid) {
      this.setStatus(400);
      return new Response().sendResponseFailure("uuid missing", false);
    }
    if (!request.id) {
      this.setStatus(400);
      return new Response().sendResponseFailure("id missing", false);
    }
    if (!request.captcha) {
      this.setStatus(400);
      return new Response().sendResponseFailure("captcha missing", false);
    }
    try {
      const captchaUseCase = new CaptchaUseCase(this.captchaRepository);
      let captchaData = await captchaUseCase.verify(request.id);
      if (captchaData) {
        if (captchaData.captcha === request.captcha) {
          captchaUseCase.destroyCaptcha(request.id)
          const authUseCase = new VerifyJwtTokens(this.authRepository);
          let verify_user_res = await authUseCase.verifyUser({ loginId: request.uuid });
          //console.log('verify_user_res', verify_user_res)
          if (verify_user_res) {
            let receipt = <any>[];
            let otp = new Util2FA().generateNewToken()
            receipt.push(verify_user_res.email)
            let otp_generate_time = new Date();
            let saveOtp = await new GenerateToken(this.authRepository).saveOtp({ loginId: request.uuid, otp: otp, otp_generate_time: otp_generate_time })
            //reset attempt
            await new GenerateToken(this.authRepository).saveAttempt({ loginId: request.uuid, attempt: 0, otp_generate_time: otp_generate_time });
            if (saveOtp) {
              new Util2FA().sendMail(otp, receipt, verify_user_res.jwtToken)
              return new Response().sendResponseSuccess({ uuid: request.uuid, remaining: 90, now: new Date() }, true);
            } else {
              return new Response().sendResponseSuccess("error while generating code", true);
            }
          } else {
            return new Response().sendResponseFailure({ message: "user not found" }, true);
          }
        } else {
          return new Response().sendResponseFailure("not valid", false);
        }
      } else {
        return new Response().sendResponseFailure("not valid", false);
      }

    } catch (Error: any) {
      return new Response().sendResponseFailure({ message: Error.message }, false);
    }
  }
  /**
   * verify jwt token
   * @param token
   */
  @Post("verifyToken")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async verifyToken(@Body() request: any) {
    if (!request) {
      this.setStatus(400);
      return new Response().sendResponseFailure("token missing", false);
    }
    let token = request.token;
    try {
      const useCase = new VerifyJwtTokens(this.authRepository);
      let token_res = await useCase.execute(token);
      if (!token_res) return new Response().sendResponseFailure('no token found', false);
      //check for ideal time for 15 min
      let validWindow = await new Utils().verifyJwtBasedOnTime(token_res.token_generated_time);
      if (validWindow) {
        let verify_token = new Utils().verifyJwt(token);
        if (verify_token) {
          await new GenerateToken(this.authRepository).updateJwtTokenTime(token);
          return new Response().sendResponseSuccess(token_res, true);
        } else {
          return new Response().sendResponseFailure("token expire", false);
        }
      } else {
        return new Response().sendResponseFailure('token expire', false);
      }
    } catch (Error: any) {
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  /**
  * logout
  * @param token
  */
  @Post("logout")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async logout(@Body() request: ILogout) {
    if (!request.jwtToken) {
      this.setStatus(400);
      return new Response().sendResponseFailure("token missing", false);
    }
    if (!request.uuid) {
      this.setStatus(400);
      return new Response().sendResponseFailure("uuid missing", false);
    }

    try {
      const token = await new VerifyJwtTokens(this.authRepository).logout(request);
      return new Response().sendResponseSuccess(token, true);
    } catch (Error: any) {
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  @Get("getCaptcha")
  async getCaptcha(@Request() request: any, @Query() id: string): Promise<any> {
    let filename = 'file2.png'
    const captchaUseCase = new CaptchaUseCase(this.captchaRepository);
    let file = await new CaptchaUtils().getCaptcha(captchaUseCase, id, filename)
    const stat: fs.Stats = await fs.promises.stat(file);
    let cType = mime.getType(file)
    this.setStatus(200);
    this.setHeader('Content-Length', stat.size.toString());
    this.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    if (cType) {
      this.setHeader('Content-Type', cType);
    }
    return fs.createReadStream(file);
  }
  @Get("verifyCaptcha")
  async verifyCaptcha(@Query() captcha: string, @Query() id: string, @Request() request: any): Promise<any> {
    const captchaUseCase = new CaptchaUseCase(this.captchaRepository);
    let captchaData = await captchaUseCase.verify(id);
    if (captchaData) {
      if (captchaData.captcha === captcha) {
        captchaUseCase.destroyCaptcha(id)
        return new Response().sendResponseSuccess("valid", true);
      } else {
        return new Response().sendResponseFailure("not valid", false);
      }
    } else {
      return new Response().sendResponseFailure("not valid", false);
    }

  }


  async verifyJwtToken(jwt_token: string) {
    try {
      const useCase = new VerifyJwtTokens(this.authRepository);
      let token_res = await useCase.execute(jwt_token);
      let result = await new Auth().verifyJwtToken(jwt_token, useCase);
      return result;
    } catch (error) {
      return null;
    }
  }

  @Post("generateJwtToken")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async generateJwtToken(@Body() request: IResetPassword) {
    if (!request.email) {
      this.setStatus(400);
      return new Response().sendResponseFailure("no email found", false);
    }
    // TODO use promises
    try {
      // Bind the reset token to the requesting email (was a hardcoded
      // 'shineAdmin', leaving the token unbound to any user — a valid reset
      // token could then be used to reset ANY account by putting a different
      // email in the reset request body). resetPassword now enforces that the
      // token's bound email matches the account being reset.
      let data = {
        uuid: request.email, email: request.email, userAgent: "useragent", ipAddress: "", jwtToken: '', type: 'reset'
      };
      const token = new GenerateToken(this.authRepository);
      let jwt = await new Auth().generateJwtToken(data, token);
      return new Response().sendResponseSuccess(jwt, true);
    } catch (Error: any) {
      return new Response().sendResponseFailure(Error.message, false);
    }
  }

  @Post("destroyJwtToken")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async destroyJwtToken(@Body() request: IJwtToken) {
    if (!request.token) {
      this.setStatus(400);
      return new Response().sendResponseFailure("token", false);
    }
    // TODO use promises
    try {
      let data = {
        uuid: 'shineAdmin', userAgent: "useragent", ipAddress: " ", jwtToken: '', type: 'reset'
      };
      const vToken = new VerifyJwtTokens(this.authRepository);
      let dJwt = await vToken.destroyToken(request.token)
      return new Response().sendResponseSuccess(dJwt, true);
    } catch (Error: any) {
      return new Response().sendResponseFailure(Error.message, false);
    }
  }


  @Post("verifyUser")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async verifyUser(@Body() request: IOtpVerify) {
    try {
      if (!request.uuid) {
        this.setStatus(400);
        return new Response().sendResponseFailure("uuid missing !", false);
      }
      if (!request.otp) {
        this.setStatus(400);
        return new Response().sendResponseFailure("otp missing !", false);
      }
      let result = await new VerifyJwtTokens(this.authRepository).verifyNewUser(request);
      return new Response().sendResponseSuccess(result, true);
    } catch (Error: any) {
      return new Response().sendResponseFailure(Error.message, false);
    }
  }


  @Post("push_2fa")
  @Example({
    "success": true,
    "error": [],
    "data": {
    }
  })
  async push_2fa(@Body() request: IPush2FA) {
    try {
      if (!request.uuid) {
        this.setStatus(400);
        return new Response().sendResponseFailure("uuid missing !", false);
      }
      if (!request.otp) {
        this.setStatus(400);
        return new Response().sendResponseFailure("otp missing !", false);
      }
      let otp = new Util2FA().generateNewToken()
      let receipt = <any>[];
      let otp_generate_time = new Date();
      let saveOtp = await new GenerateToken(this.authRepository).saveOtp({ uuid: request.uuid, otp: otp, email: request.email, otp_generate_time: otp_generate_time })
      if (saveOtp) {
        new Util2FA().sendMail(otp, receipt, "email")
        new Util2FA().sendOtp({ otp, receipt })
        return new Response().sendResponseSuccess({ uuid: request.uuid, now: otp_generate_time }, true);
      } else {
        return new Response().sendResponseSuccess("error while generating otp", true);
      }
    } catch (Error: any) {
      return new Response().sendResponseFailure(Error.message, false);
    }
  }


}
