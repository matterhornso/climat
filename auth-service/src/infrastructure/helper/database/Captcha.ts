import { CaptchaConnection } from "../../../interfaces/database/IDBConnection"
import { CaptchaModel } from '../../modal/captcha/captcha.model'
export class CaptchaMongoConnection extends CaptchaConnection {

  constructor() {
    super();
  }


  async saveCaptcha(captcha: any) {
    console.log("saveCaptcha")
    let captcha_res = await CaptchaModel.saveCaptcha(captcha)
    return captcha_res
  }
  async verifyCaptcha(captcha: any) {
    let id = await CaptchaModel.getCaptchaById(captcha)
    return id
  }
  async destroyCaptcha(id: string) {
    let res_id = await CaptchaModel.destroyCaptcha(id)
    return res_id
  }
}