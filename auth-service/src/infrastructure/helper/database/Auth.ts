import { AuthModel } from '../../modal/auth/auth.model'
import { AuthConnection } from "../../../interfaces/database/IDBConnection"
export class AuthMongoConnection extends AuthConnection {
  constructor() {
    super();
  }
  async generateJwt(query: any) {
    let auth = await AuthModel.saveJwtToken(query);
    return auth;
  }
  async saveOtp(otp: any) {
    let auth = await AuthModel.saveOtp(otp);
    return auth;
  }
  async verifyJwtToken(query: any) {
    let auth = await AuthModel.verifyJwtToken(query);
    return auth;
  }
  async destroyToken(token: string) {
    let auth = await AuthModel.destroyToken(token);
    return auth;
  }
  async verifyOtp(otp: any) {
    let auth = await AuthModel.verifyOtp(otp);
    return auth;
  }

  async saveAttempt(otp: any) {
    let auth = await AuthModel.saveAttempt(otp);
    return auth;
  }
  async logout(logout: any) {
    let auth = await AuthModel.logout(logout);
    return auth;
  }
  async verifyCaptchaById(id: string) {
    let res_id = await AuthModel.verifyCaptcha(id)
    return res_id
  }
  async updateJwtToken(jwt: string, id: string) {
    let res = await AuthModel.updateJwtToken(jwt, id)
    return res
  }
  async verifyUser(otp: any) {
    let res = await AuthModel.verifyUser(otp)
    return res
  }
  async verifyNewUser(verify: string) {
    let res = await AuthModel.verifyNewUser(verify)
    return res
  }
  async updateJwtTokenTime(jwtToken: string) {
    let res = await AuthModel.updateJwtTokenTime(jwtToken)
    return res
  }

}