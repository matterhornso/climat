export interface ICreatePermissionRequest {
  resource: string;
  action: string;
  attributes: string;
  // signatures: string[];
  // serializedTransaction: number[];
}

export interface IUpdatePermissionRequest {
  id: string;
  resource?: string;
  action?: string;
  attributes?: string;
}

export interface ICreateRoleRequest {
  name: string;
  description: string;
  archived: boolean;
  permissions?: string[];
}

export interface IUpdateRoleRequest {
  id: string;
  description: string;
  archived: boolean;
}

export interface IUpdateRolePermissionRequest {
  id: string;
  add_permissions: string[];
  remove_permissions: string[];
}