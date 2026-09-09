import { Schema } from "mongoose";
import { saveCaptcha, getCaptchaById, destroyCaptcha } from "./captcha.statics";

const CaptchaSchema = new Schema({
  captcha: String,
  id: String,
}, { timestamps: true });

CaptchaSchema.statics.saveCaptcha = saveCaptcha;
CaptchaSchema.statics.getCaptchaById = getCaptchaById;
CaptchaSchema.statics.destroyCaptcha = destroyCaptcha;
export default CaptchaSchema;