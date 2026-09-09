import { CreateRole, UpdateRole } from '../../domain/index';

export abstract class IRoleRepository {
  abstract createRole(role: CreateRole): Promise<any>
  abstract updateRole(role: UpdateRole): Promise<any>
  abstract updateRolePermission(role: UpdateRole): Promise<any>
  abstract getRoleByID(id: string): Promise<any>
  abstract getRoleByName(name: string): Promise<any>
  abstract getAllRoles(): Promise<any>
  abstract getRoleAttribute(): Promise<any>
}