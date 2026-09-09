import { ILoginRepository } from "../repositories/ILoginRepository";

export class Login {
  private loginRepository: ILoginRepository;
  constructor(loginRepository: ILoginRepository) {
    this.loginRepository = loginRepository;
  }

  execute(login: any) {
    return this.loginRepository.login(login);
  }
}