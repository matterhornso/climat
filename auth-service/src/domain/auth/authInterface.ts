export interface IGenerateJwt {
  uuid: string;
  type: string;
  jwtToken: string;
  userAgent: string;
  ipAddress: string;
  captchaVerify?: boolean;
  loginId?: string
  email?: string;
  otp?: string;
}

export interface IDestroyJwt {
  uuid: string;
  jwtToken: string;
}