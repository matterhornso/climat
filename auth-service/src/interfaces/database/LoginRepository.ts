import { LoginIn } from '../../domain/index'
import { ILoginRepository } from '../../application/repositories/ILoginRepository'
import { LoginConnection } from './IDBConnection'

export class LoginRepository extends ILoginRepository {

  private connection: LoginConnection

  constructor(connection: LoginConnection) {
    super()
    this.connection = connection
  }

  async login(login: any): Promise<any> {
    let queryResults = await this.connection.login(login);
    return queryResults;
  }
}