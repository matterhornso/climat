import { model } from "mongoose";
import { ICaptchaDocument, ICaptchaModel } from "./captcha.types";
import CaptchaSchema from "./captcha.schema";
export const CaptchaModel = model<ICaptchaDocument>("captcha", CaptchaSchema) as ICaptchaModel;