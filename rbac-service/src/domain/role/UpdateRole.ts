import { IUpdateRole } from './IUpdateRole'

export class UpdateRole implements IUpdateRole {
  id: string;
  name?: string;
  description?: string;
  archived?: boolean;

  constructor(role: IUpdateRole) {
    if (!role.id) throw new Error('role id missing!');

    if (!role.name && !role.description && !role.archived) {
      throw new Error('atleast one role parameter has to updated!');
    }

    this.id = role.id;
    if (role.name) this.name = role.name;
    if (role.description) this.description = role.description;
    if (role.archived) this.archived = role.archived;
  }
}