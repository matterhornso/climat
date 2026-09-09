import { Document, Model } from "mongoose";
import { IPermission } from "../../../domain/permission/IPermission";
import { IUpdatePermission } from "../../../domain/permission/IUpdatePermission";

export interface IPermissionDocument extends Document {
}

export interface IPermissionModel extends Model<IPermissionDocument> {
  createPermission: (this: IPermissionModel, permission: IPermission) => Promise<IPermission>;
  findOneUpdate: (this: IPermissionModel, permission: IUpdatePermission) => Promise<IUpdatePermission>;
  findPermissionById: (this: IPermissionModel, id: string) => Promise<IUpdatePermission>;
  getAllPermissions: (this: IPermissionModel) => Promise<IUpdatePermission>;
  createPermissionInBulk: (this: IPermissionModel, permissions: any) => Promise<any>;
  findPermissionByActionAndResource: (this: IPermissionModel, action: string, resource: string) => Promise<any>;
}