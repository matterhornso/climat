import { CreateRole, UpdateRole, UpdateRolePermission } from '../../domain/index'
import { IRoleRepository } from '../../application/repositories/IRoleRepository'
import { IDBConnection } from './IDBConnection'

export class RoleRepository extends IRoleRepository {
  private connection: IDBConnection

  constructor(connection: IDBConnection) {
    super()
    this.connection = connection
  }

  async createRole(role: CreateRole): Promise<any> {
    let result = await this.connection.createRole(role);
    return result;
  }

  async updateRolePermission(role: UpdateRolePermission): Promise<any> {
    let result = await this.connection.UpdateRolePermission(role);
    return result;
  }

  async updateRole(role: UpdateRole): Promise<any> {
    let result = await this.connection.updateRole(role);
    return result;
  }

  async getRoleByID(id: string): Promise<any> {
    let result = await this.connection.getRoleByID(id);
    return result;
  }

  async getRoleByName(name: string): Promise<any> {
    let result = await this.connection.getRoleByName(name);
    console.log(result, "resssssssss")
    return result;
  }

  async getAllRoles(): Promise<any> {
    let result = await this.connection.getAllRoles();
    return result;
  }

  async getRoleAttribute(): Promise<any> {
    let result = await this.connection.getRoleAttribute();
    return result;
  }
}