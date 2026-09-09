import { Captcha } from '../../domain/index';

export abstract class ICaptchaRepository {
  abstract save(captcha: Captcha): Promise<any>
  abstract verify(captcha: string): Promise<any>
  abstract verifyCaptcha(id: string): Promise<any>
  abstract destroyCaptcha(id: string): Promise<any>
}