export interface IUpdateRole {
  id: string;
  name?: string;
  description?: string;
  archived?: boolean;
}

export interface IUpdateRolePermission {
  id: string;
  add_permissions?: string[];
  remove_permissions?: string[];
}