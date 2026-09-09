import { CreatePermission, UpdatePermission } from '../../domain/index';

export abstract class IPermissionRepository {
  abstract createPermission(permission: CreatePermission): Promise<any>
  abstract updatePermission(permission: UpdatePermission): Promise<any>
  abstract getPermissionByID(id: string): Promise<any>
  abstract getAllPermissions(): Promise<any>
}