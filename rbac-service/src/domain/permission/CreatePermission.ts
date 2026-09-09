import { IPermission } from './IPermission'

export class CreatePermission implements IPermission {
  resource!: string;
  action!: string;
  attributes!: string;
  // role?: string;

  constructor(permission: IPermission) {
    if (!permission.resource) throw new Error('Permission resource not defined');
    if (!permission.action) throw new Error('Permission action not defined');
    if (!permission.attributes) throw new Error('Permission attributes not defined');

    this.resource = permission.resource;
    this.action = permission.action;
    this.attributes = permission.attributes;
    // if (!permission.role) this.role = permission.role;
  }
  uuid?: string | undefined;

}