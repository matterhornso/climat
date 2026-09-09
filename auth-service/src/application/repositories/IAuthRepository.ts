import { GenerateJwtToken } from '../../domain/index';

export abstract class IAuthRepository {
  abstract generateJwt(jwtToken: GenerateJwtToken): Promise<any>
  abstract verifyJwtToken(jwtToken: string): Promise<any>
  abstract updateJwtToken(jwt: string, id: string): Promise<any>
  abstract updateJwtTokenTime(jwt: string): Promise<any>
  abstract destroyToken(jwtToken: string): Promise<any>
  abstract saveOtp(otp: any): Promise<any>
  abstract verifyOtp(otp: any): Promise<any>
  abstract verifyUser(otp: any): Promise<any>
  abstract verifyNewUser(verify: any): Promise<any>
  abstract saveAttempt(otp: any): Promise<any>
  abstract logout(logout: any): Promise<any>
}