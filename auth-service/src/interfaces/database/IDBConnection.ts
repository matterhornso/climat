export abstract class CaptchaConnection {
  abstract saveCaptcha(captcha: any): any
  abstract verifyCaptcha(captcha: any): any
  abstract destroyCaptcha(id: string): any
}

export abstract class LoginConnection {
  abstract login(query: any): any
}
export abstract class AuthConnection {
  abstract generateJwt(query: any): any
  abstract verifyJwtToken(token: string): any
  abstract verifyNewUser(verify: string): any
  abstract destroyToken(token: string): any
  abstract saveOtp(otp: any): any
  abstract verifyOtp(otp: any): any
  abstract saveAttempt(otp: any): any
  abstract verifyUser(otp: any): any
  abstract updateJwtTokenTime(jwt: string): any
  abstract logout(logout: any): any
  abstract updateJwtToken(jwt: string, id: string): any
  abstract verifyCaptchaById(id: string): any

}