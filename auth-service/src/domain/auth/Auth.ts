import { IDestroyJwt, IGenerateJwt } from './authInterface';
import { GenerateJwtToken, DestroyJwtToken } from '../index'
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || ''

export class Auth {
  constructor() { }

  generateJwtToken(generateJwtToken: IGenerateJwt, userCase: any) {
    if (!generateJwtToken) throw new Error('data not defined');
    if (!generateJwtToken.uuid) throw new Error('uuid not defined');
    if (!generateJwtToken.userAgent) throw new Error('userAgent not defined');
    if (!generateJwtToken.type) throw new Error('type not defined');
    if (!userCase) throw new Error('userCase not defined');
    let JwtToken = new GenerateJwtToken(generateJwtToken, SECRET_KEY)
    //console.log('JwtToken', JwtToken)
    return userCase.execute(JwtToken)
  }

  destroyJwtToken(destroyJwtToken: IDestroyJwt) {
    let generateJwtToken = new DestroyJwtToken(destroyJwtToken)
  }
  generateNewJwtToken(data: any) {
    return jwt.sign(data, SECRET_KEY, { expiresIn: "1h" }); //jwt token will expire in 1h
  }
  verifyJwtToken(jwtToken: string, useCase: any) {
    if (!jwtToken) throw new Error('jwtToken not defined');
    try {
      let verify = jwt.verify(jwtToken, SECRET_KEY);
      return useCase.execute(jwtToken)
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}