import { Captcha } from '../../domain/index'
import { ICaptchaRepository } from '../../application/repositories/ICaptchaRepository'
import { CaptchaConnection } from './IDBConnection'

export class CaptchaRepository extends ICaptchaRepository {

  private connection: CaptchaConnection

  constructor(connection: CaptchaConnection) {
    super()
    this.connection = connection
  }

  async save(captcha: any): Promise<any> {
    let queryResults = await this.connection.saveCaptcha(captcha);
    return queryResults;
  }

  async verify(captcha: any): Promise<any> {
    let queryResults = await this.connection.verifyCaptcha(captcha);
    return queryResults;
  }

  async destroyCaptcha(id: string): Promise<any> {
    let queryResults = await this.connection.destroyCaptcha(id);
    return queryResults;
  }
  async verifyCaptcha(id: string): Promise<any> {
    let queryResults = await this.connection.verifyCaptcha(id);
    return queryResults;
  }
}