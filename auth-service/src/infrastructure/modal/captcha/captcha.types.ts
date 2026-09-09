import { Document, Model } from "mongoose";
import { ICaptcha } from "../../../domain/captcha/captchaInterface";

export interface ICaptchaDocument extends ICaptcha, Document {
}

export interface ICaptchaModel extends Model<ICaptchaDocument> {
  saveCaptcha: (this: ICaptchaModel, captcha: any) => Promise<any>;
  getCaptchaById: (this: ICaptchaModel, captcha: string) => Promise<any>;
  destroyCaptcha: (this: ICaptchaModel, id: string) => Promise<any>;
}