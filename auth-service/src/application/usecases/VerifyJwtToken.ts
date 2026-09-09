import { IAuthRepository } from "../repositories/IAuthRepository";

export class VerifyJwtTokens {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  execute(jwt: string) {
    return this.authRepository.verifyJwtToken(jwt);
  }
  destroyToken(jwt: string) {
    return this.authRepository.destroyToken(jwt);
  }
  verifyOtp(otp: any) {
    return this.authRepository.verifyOtp(otp);
  }
  verifyUser(otp: any) {
    return this.authRepository.verifyUser(otp);
  }
  verifyNewUser(verify: any) {
    return this.authRepository.verifyNewUser(verify);
  }
  logout(logout: any) {
    return this.authRepository.logout(logout);
  }
}