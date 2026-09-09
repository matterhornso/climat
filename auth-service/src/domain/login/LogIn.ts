import { ILogin } from './loginInterface';

export class LoginIn {
  constructor() { }

  login(login: ILogin, useCase: any): any {
    if (!login.email) throw new Error('email not defined');
    if (!login.password) throw new Error('password not defined');
    if (!useCase) throw new Error('useCase not defined');

    return useCase.execute(login)
  }
}