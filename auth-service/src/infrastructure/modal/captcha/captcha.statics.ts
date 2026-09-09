import { ICaptchaModel } from "./captcha.types";
import { ICaptcha } from "../../../domain/captcha/captchaInterface";
import { Model } from "mongoose";

export async function saveCaptcha(
  this: Model<ICaptchaModel>,
  captcha: any
): Promise<any> {
  const record = await this.create(captcha)
  return record;
}

export async function getCaptchaById(
  this: Model<ICaptchaModel>,
  captcha: string
): Promise<any> {
  const record = await this.findOne({ id: captcha })
  return record;
}
export async function destroyCaptcha(
  this: Model<ICaptchaModel>,
  id: string
): Promise<any> {
  const record = await this.deleteOne({ id: id })
  return record;
}
