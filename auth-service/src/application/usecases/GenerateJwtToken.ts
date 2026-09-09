import { GenerateJwtToken } from '../../domain/index';
import { IAuthRepository } from "../repositories/IAuthRepository";


export class GenerateToken {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  execute(jwt: GenerateJwtToken) {
    return this.authRepository.generateJwt(jwt);
  }
  updateJwtToken(jwt: string, id: string) {
    return this.authRepository.updateJwtToken(jwt, id);
  }
  updateJwtTokenTime(jwt: string) {
    return this.authRepository.updateJwtTokenTime(jwt);
  }
  saveOtp(otp: any) {
    return this.authRepository.saveOtp(otp);
  }
  saveAttempt(otp: any) {
    return this.authRepository.saveAttempt(otp);
  }
}
