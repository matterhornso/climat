import { ICaptcha } from './captchaInterface';

export class Captcha {
  constructor() { }
  captcha(data: ICaptcha, useCase: any): any {
    if (!data.captcha) throw new Error('captcha not defined');
    if (data.captcha.length < 6) throw new Error('captcha must be greater than six');
    return useCase.execute(data)
  }
}