import { IUpdateRolePermission } from './IUpdateRole'

export class UpdateRolePermission implements IUpdateRolePermission {
  id: string;
  add_permissions?: string[];
  remove_permissions?: string[];

  constructor(role: IUpdateRolePermission) {
    if (!role.id) throw new Error('role id missing!');

    // TODO check add_permissions and remove_permissions atleast one length > 0

    this.id = role.id;

    if (role.add_permissions) this.add_permissions = role.add_permissions;
    if (role.remove_permissions) this.remove_permissions = role.remove_permissions;
  }
}