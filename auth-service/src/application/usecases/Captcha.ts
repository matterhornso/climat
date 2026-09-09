import { ICaptchaRepository } from "../repositories/ICaptchaRepository";

export class CaptchaUseCase {
  private captchaRepository: ICaptchaRepository;
  constructor(captchaRepository: ICaptchaRepository) {
    this.captchaRepository = captchaRepository;
  }
  save(captcha: any) {
    return this.captchaRepository.save(captcha);
  }
  verify(captcha: string) {
    return this.captchaRepository.verify(captcha);
  }
  verifyCaptcha(id: string) {
    return this.captchaRepository.verifyCaptcha(id);
  }
  destroyCaptcha(id: string) {
    return this.captchaRepository.destroyCaptcha(id);
  }
}