import { IDestroyJwt } from './authInterface';

export class DestroyJwtToken implements IDestroyJwt {
  uuid!: string;
  jwtToken!: string;

  constructor(user: IDestroyJwt) {
    if (!user.uuid) throw new Error('uid not defined');
    if (!user.jwtToken) throw new Error('Jwt not defined');

    this.uuid = user.uuid;
    this.jwtToken = user.jwtToken;
  }
}