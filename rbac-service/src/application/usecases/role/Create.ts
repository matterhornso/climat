import { CreateRole } from "../../../domain/index";
import { IRoleRepository } from "../../repositories/IRoleRepository";

export default class Create {
  private roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  execute(role: CreateRole) {
    return this.roleRepository.createRole(role);
  }
}