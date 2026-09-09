import { Document, Model } from "mongoose";
import { IRole } from "../../../domain/role/IRole";
import { IUpdateRole, IUpdateRolePermission } from "../../../domain/role/IUpdateRole";

export interface IRoleDocument extends Document {
}

export interface IRoleModel extends Model<IRoleDocument> {
  createRole: (this: IRoleModel, role: IRole) => Promise<IRole>;
  createRoleBulk: (this: IRoleModel, role: any) => Promise<any>;
  findOneUpdate: (this: IRoleModel, role: IUpdateRole) => Promise<IUpdateRole>;
  updateRolePermission: (this: IRoleModel, role: IUpdateRolePermission) => Promise<IUpdateRolePermission>;
  findRoleById: (this: IRoleModel, id: string) => Promise<any>;
  findRoleByName: (this: IRoleModel, name: string) => Promise<any>;
  getAllRoles: (this: IRoleModel) => Promise<any>;
  getRoleAttribute: (this: IRoleModel) => Promise<any>;
}