import { UpdatePermission } from '../../../domain/index';
import { IPermissionRepository } from "../../repositories/IPermissionRepository";

export default class Update {
  private permissionRepository: IPermissionRepository;

  constructor(permissionRepository: IPermissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  execute(permission: UpdatePermission) {
    return this.permissionRepository.updatePermission(permission);
  }
}