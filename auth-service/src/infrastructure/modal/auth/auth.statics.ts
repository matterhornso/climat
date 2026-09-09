import { IAuthDocument, IAuthModel } from "./auth.types";
import { IGenerateJwt } from "../../../domain/auth/authInterface";
import { Model } from "mongoose";

export async function saveJwtToken(
  this: Model<IAuthModel>,
  jwt: IGenerateJwt
): Promise<any> {
  const record = await this.create({ email: jwt.email, otp: jwt.otp, captchaVerify: jwt.captchaVerify, jwtToken: jwt.jwtToken, loginId: jwt.loginId, uuid: jwt.uuid, type: jwt.type, userAgent: jwt.userAgent, ipAddress: jwt.ipAddress, otp_generate_time: new Date(), token_generated_time: new Date() })
  return record;
}
export async function updateJwtToken(
  this: Model<IAuthModel>,
  jwt: string,
  loginId: string
): Promise<any> {
  var set: any = {};
  set.token_generated_time = new Date();
  set.jwtToken = jwt;
  const record = await this.updateOne({ loginId: loginId },
    {
      $set: set
    },
    { upsert: false }
  )
  return record;
}

export async function verifyJwtToken(
  this: Model<IAuthModel>,
  jwtToken: string
): Promise<any> {
  const record = await this.findOne({ jwtToken: jwtToken, status: 'active' })
  return record;
}

export async function verifyNewUser(
  this: Model<IAuthModel>,
  verify: any
): Promise<any> {
  const record = await this.findOne({ uuid: verify.uuid, otp: verify.otp })
  return record;
}
export async function updateJwtTokenTime(
  this: Model<IAuthModel>,
  jwtToken: string
): Promise<any> {
  var set: any = {};
  set.token_generated_time = new Date();
  const record = await this.updateOne({ jwtToken: jwtToken },
    {
      $set: set
    },
    { upsert: false }
  )
  return record;
}
export async function verifyOtp(
  this: Model<IAuthModel>,
  otpData: any
): Promise<any> {
  const record = await this.findOne({ loginId: otpData.uuid })
  return record;
}

export async function verifyUser(
  this: Model<IAuthModel>,
  otpData: any
): Promise<any> {
  const record = await this.findOne({ loginId: otpData.loginId })
  return record;
}
export async function verifyCaptcha(
  this: Model<IAuthModel>,
  uuid: string
): Promise<any> {
  const record = await this.findOne({ loginId: uuid })
  return record;
}
export async function destroyToken(
  this: Model<IAuthModel>,
  jwtToken: string
): Promise<any> {
  const record = await this.remove({ jwtToken: jwtToken })
  return record;
}
export async function saveOtp(
  this: Model<IAuthModel>,
  otp: any
): Promise<any> {
    if (!otp.loginId) {
    // An undefined filter collapses to {} and updateOne would mutate an
    // arbitrary document. Fail loudly instead.
    throw new Error("saveOtp/saveAttempt requires a loginId");
  }
var set: any = {};
  set.otp = otp.otp;
  set.otp_generate_time = otp.otp_generate_time;
  if (otp.email) set.email = otp.email
  const record = await this.updateOne({ loginId: otp.loginId }, {
    $set: set
  }, { upsert: false });
  return record;
}
export async function saveAttempt(
  this: Model<IAuthModel>,
  otp: any
): Promise<any> {
    if (!otp.loginId) {
    // An undefined filter collapses to {} and updateOne would mutate an
    // arbitrary document. Fail loudly instead.
    throw new Error("saveOtp/saveAttempt requires a loginId");
  }
var set: any = {};
  set.attempt = otp.attempt;
  const record = await this.updateOne({ loginId: otp.loginId }, {
    $set: set
  }, { upsert: true });
  return record;
}
export async function logout(
  this: Model<IAuthModel>,
  logout: any
): Promise<any> {
  var set: any = {};
  set.status = 'delete';
  const record = await this.updateOne({ loginId: logout.uuid, jwtToken: logout.jwtToken }, {
    $set: set
  }, { upsert: false });
  return record;
}