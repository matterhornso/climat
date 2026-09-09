import { GenerateJwtToken } from '../../domain/index'
import { IAuthRepository } from '../../application/repositories/IAuthRepository'
import { AuthConnection } from './IDBConnection'

export class AuthRepository extends IAuthRepository {

  private connection: AuthConnection

  constructor(connection: AuthConnection) {
    super()
    this.connection = connection
  }

  async generateJwt(jwt: GenerateJwtToken): Promise<any> {
    let queryResults = await this.connection.generateJwt(jwt);
    return queryResults;
  }

  async verifyJwtToken(jwtToken: string): Promise<any> {
    let queryResults = await this.connection.verifyJwtToken(jwtToken);
    return queryResults;
  }
  async verifyNewUser(verify: any): Promise<any> {
    let queryResults = await this.connection.verifyNewUser(verify);
    return queryResults;
  }

  async destroyToken(jwtToken: string): Promise<any> {
    let queryResults = await this.connection.destroyToken(jwtToken);
    return queryResults;
  }
  async saveOtp(otp: any): Promise<any> {
    let queryResults = await this.connection.saveOtp(otp);
    return queryResults;
  }
  async verifyOtp(otp: any): Promise<any> {
    let queryResults = await this.connection.verifyOtp(otp);
    return queryResults;
  }

  async saveAttempt(otp: any): Promise<any> {
    let queryResults = await this.connection.saveAttempt(otp);
    return queryResults;
  }
  async logout(logout: any): Promise<any> {
    let queryResults = await this.connection.logout(logout);
    return queryResults;
  }
  async updateJwtToken(jwt: string, id: string): Promise<any> {
    let queryResults = await this.connection.updateJwtToken(jwt, id);
    return queryResults;
  }
  async verifyUser(otp: any): Promise<any> {
    let queryResults = await this.connection.verifyUser(otp);
    return queryResults;
  }
  async updateJwtTokenTime(jwt: string): Promise<any> {
    let queryResults = await this.connection.updateJwtTokenTime(jwt);
    return queryResults;
  }
  async verifyCaptcha(id: string): Promise<any> {
    let queryResults = await this.connection.verifyCaptchaById(id);
    return queryResults;
  }

}