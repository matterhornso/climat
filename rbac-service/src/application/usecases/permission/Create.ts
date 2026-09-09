import { CreatePermission } from "../../../domain/index";
import { IPermissionRepository } from "../../repositories/IPermissionRepository";

export default class Create {
  private permissionRepository: IPermissionRepository;

  constructor(permissionRepository: IPermissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  execute(permission: CreatePermission) {
    return this.permissionRepository.createPermission(permission);
  }
}