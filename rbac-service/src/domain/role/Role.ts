import { CreateRole } from './CreateRole';
import { UpdateRole } from './UpdateRole';
import { UpdateRolePermission } from './UpdateRolePermission';
import { IRole } from './IRole';
import { IUpdateRole, IUpdateRolePermission } from './IUpdateRole';

export class Role {

  constructor() { };

  createRole(role: IRole, useCase: any) {
    let createRole = new CreateRole(role);
    return useCase.execute(createRole);
  }

  updateRole(role: IUpdateRole, useCase: any) {
    let updateRole = new UpdateRole(role);
    return useCase.updateRole(updateRole)
  }

  updateRolePermission(role: IUpdateRolePermission, useCase: any) {
    let updateRole = new UpdateRolePermission(role);
    return useCase.updateRolePermission(updateRole)
  }
}