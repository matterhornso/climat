import { LoginIn } from '../../domain/index';

export abstract class ILoginRepository {
  abstract login(login: LoginIn): Promise<any>
}