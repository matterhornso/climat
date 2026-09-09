import { IPermissionRepository } from "../../repositories/IPermissionRepository";

export default class GetPermission {
  private permissionRepository: IPermissionRepository

  constructor(permissionRepository: IPermissionRepository) {
    this.permissionRepository = permissionRepository
  }

  getPermissionByID(id: string) {
    return this.permissionRepository.getPermissionByID(id);
  }

  getAllPermissions() {
    return this.permissionRepository.getAllPermissions();
  }
}