import { IRole } from './IRole'

export class CreateRole implements IRole {
  name!: string;
  description!: string;
  archived: boolean;
  permissions?: string[] | undefined;

  constructor(role: IRole) {
    if (!role.name) throw new Error('Role name missing!');
    if (!role.description) throw new Error('Role description missing!');
    if (role.archived === undefined) throw new Error('Role archived missing');
    if (!role.permissions) throw new Error('Role permissions missing!');

    // TODO validate permissions ids in mongodb

    this.name = role.name;
    this.description = role.description;
    this.archived = role.archived;
    if (role.permissions) this.permissions = role.permissions;
  }
}