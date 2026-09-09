import { UpdateRole, UpdateRolePermission } from '../../../domain/index';
import { IRoleRepository } from "../../repositories/IRoleRepository";

export default class Update {
  private roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  updateRole(role: UpdateRole) {
    return this.roleRepository.updateRole(role);
  }

  updateRolePermission(role: UpdateRolePermission) {
    // TODO check if permissions getting added or removed are present and valid
    return this.roleRepository.updateRolePermission(role);
  }
}