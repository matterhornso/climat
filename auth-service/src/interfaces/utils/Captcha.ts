import captchapng2 = require('captchapng2');
import os from "os";
import fs from "fs";
const crypto = require('crypto');
export class CaptchaUtils {
  constructor() {
  }
  async getCaptcha(captchaUseCase: any, id: string, filename: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let rand = crypto.randomInt(99999, 999999)
        let png = new captchapng2(80, 30, rand); // width,height, numeric captcha
        let downloadFile = os.tmpdir() + "/" + filename;
        fs.writeFile(downloadFile, png.getBuffer(), async (err) => { if (!err) resolve(downloadFile) });
        captchaUseCase.save({ captcha: rand.toString(), id: id })
      } catch (error: any) {
        console.trace(error)
      }

    })
  }
  async verifyCaptcha(captchaText: string) {
    return new Promise<any>(async (resolve, reject) => {
      let captchaFile = os.tmpdir() + "/" + "captcha.txt";
      fs.readFile(captchaFile, 'utf8', function (err, data) {
        // Display the file content
        console.log(data);
        if (data.includes(captchaText)) resolve(true)
        resolve(false)
      });
    })
  }
}