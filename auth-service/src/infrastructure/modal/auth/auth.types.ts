import { Document, Model } from "mongoose";
import { IGenerateJwt } from "../../../domain/auth/authInterface";

export interface IAuthDocument extends IGenerateJwt, Document {
}

export interface IAuthModel extends Model<IAuthDocument> {
  saveJwtToken: (this: IAuthModel, jwtTokens: IGenerateJwt) => Promise<any>;
  verifyJwtToken: (this: IAuthModel, jwtToken: string) => Promise<any>;
  destroyToken: (this: IAuthModel, jwtToken: string) => Promise<any>;
  saveOtp: (this: IAuthModel, otp: any) => Promise<any>;
  verifyOtp: (this: IAuthModel, otp: any) => Promise<any>;
  verifyUser: (this: IAuthModel, otp: any) => Promise<any>;
  verifyNewUser: (this: IAuthModel, verify: any) => Promise<any>;
  verifyCaptcha: (this: IAuthModel, uuid: string) => Promise<any>;
  saveAttempt: (this: IAuthModel, otp: any) => Promise<any>;
  logout: (this: IAuthModel, logout: any) => Promise<any>;
  updateJwtToken: (this: IAuthModel, jwt: string, loginId: string) => Promise<any>;
  updateJwtTokenTime: (this: IAuthModel, jwtToken: string) => Promise<any>;
}