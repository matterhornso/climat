export interface ILogin {
  email: string;
  password: string;
  id: string;
  captcha: string
}
export interface IResetPassword {
  email: string;
}
export interface IJwtToken {
  token: string;
}
export interface IOtpVerify {
  uuid: string;
  otp: string
}
export interface IPush2FA {
  uuid: string;
  email: string;
  otp: string
}
export interface IResendOtp {
  uuid: string;
  id: string;
  captcha: string
}
export interface ILogout {
  jwtToken: string;
  uuid: string
}

export interface IVerifyUser {
  otp: string;
  uuid: string
}