import { IRoleRepository } from "../../repositories/IRoleRepository";

export default class Get {
  private roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository
  }

  getRoleByID(id: string) {
    return this.roleRepository.getRoleByID(id);
  }

  getRoleByName(name: string) {
    return this.roleRepository.getRoleByName(name);
  }

  getAllRoles() {
    return this.roleRepository.getAllRoles();
  }

  getRoleAttribute() {
    return this.roleRepository.getRoleAttribute();
  }
}