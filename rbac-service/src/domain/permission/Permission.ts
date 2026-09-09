import { CreatePermission } from './CreatePermission';
import { UpdatePermission } from './UpdatePermission';
import { IPermission } from './IPermission';
import { IUpdatePermission } from './IUpdatePermission';

export class Permission {

  constructor() { };

  createPermission(permission: IPermission, useCase: any) {
    let createPermission = new CreatePermission(permission);
    return useCase.execute(createPermission);
  }

  updatePermission(permission: IUpdatePermission, useCase: any) {
    let updatePermission = new UpdatePermission(permission);
    return useCase.execute(updatePermission)
  }
}