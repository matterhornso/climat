import { IGenerateJwt } from './authInterface';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export class GenerateJwtToken implements IGenerateJwt {
  uuid!: string;
  jwtToken!: string;
  userAgent!: string;
  ipAddress!: string;
  type!: string
  captchaVerify?: boolean;
  loginId: string;
  otp?: string;
  email?: string;
  constructor(user: IGenerateJwt, SECRET_KEY: string) {
    if (!user.uuid) throw new Error('uuid not defined');
    if (!user.userAgent) throw new Error('UserAgent not defined');
    if (!user.type) throw new Error('type not defined');
    let expiresIn;
    if (user.type === 'reset') {
      expiresIn = "5m"
    } else {
      expiresIn = "1h"
    }
    this.uuid = user.uuid;
    this.jwtToken = jwt.sign({ data: user.uuid }, SECRET_KEY, { expiresIn: expiresIn });
    this.userAgent = user.userAgent;
    this.ipAddress = user.ipAddress
    this.type = user.type
    this.captchaVerify = user.captchaVerify
    this.loginId = uuidv4();
    this.otp = user.otp;
    this.email = user.email;
  }
}
