import { CreatePermission, UpdatePermission } from '../../domain/index'
import { IPermissionRepository } from '../../application/repositories/IPermissionRepository'
import { IDBConnection } from './IDBConnection'

export class PermissionRepository extends IPermissionRepository {
  private connection: IDBConnection

  constructor(connection: IDBConnection) {
    super()
    this.connection = connection
  }

  async createPermission(permission: CreatePermission): Promise<any> {
    let result = await this.connection.createPermission(permission);
    return result;
  }

  async updatePermission(permission: UpdatePermission): Promise<any> {
    let result = await this.connection.updatePermission(permission);
    return result;
  }

  async getPermissionByID(id: string): Promise<any> {
    let result = await this.connection.getPermissionByID(id);
    return result;
  }

  async getAllPermissions(): Promise<any> {
    let result = await this.connection.getAllPermissions();
    return result;
  }
}