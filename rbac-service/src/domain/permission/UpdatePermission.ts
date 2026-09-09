import { IUpdatePermission } from './IUpdatePermission'

export class UpdatePermission implements IUpdatePermission {
  id: string;
  resource?: string;
  action?: string;
  attributes?: string;
  // role?: string;

  constructor(permission: IUpdatePermission) {
    if (!permission.id) throw new Error('permission id missing!');

    if (!permission.resource && !permission.action && !permission.attributes) {
      throw new Error('atleast one parameter has to updated!');
    }

    this.id = permission.id;
    if (permission.resource) this.resource = permission.resource;
    if (permission.action) this.action = permission.action;
    if (permission.attributes) this.attributes = permission.attributes;
    // if (permission.role) this.role = permission.role;
  }
}