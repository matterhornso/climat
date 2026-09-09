export abstract class IDBConnection {
  abstract createPermission(query: any): any
  abstract updatePermission(query: any): any
  abstract getPermissionByID(query: any): any
  abstract getAllPermissions(): any

  abstract createRole(query: any): any
  abstract updateRole(query: any): any
  abstract UpdateRolePermission(query: any): any
  abstract getRoleByID(query: any): any
  abstract getRoleByName(query: any): any
  abstract getAllRoles(): any
  abstract getRoleAttribute(): any
}