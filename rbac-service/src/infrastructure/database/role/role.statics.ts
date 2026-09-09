import { IRoleModel } from "./role.types";
import { IUpdateRolePermission } from "../../../domain/role/IUpdateRole";
import { IRole } from "../../../domain/role/IRole";
import { Model, Schema } from "mongoose";

export async function createRole(
  this: Model<IRoleModel>,
  { name, description, archived, permissions }: {
    name: string;
    description: string;
    archived: boolean;
    permissions: string;
  }
): Promise<any> {
  return await this.create({ name, description, archived, permissions });
  // TODO handle db error
}

//create role in bulk
export async function createRoleBulk(
  this: Model<IRoleModel>,
  role: any
): Promise<any> {
  // console.log('role', role)
  return await this.create(role.role);
  // TODO handle db error
}

export async function findOneUpdate(
  this: Model<IRoleModel>,
  { id, name, description, archived, permissions }: {
    id: string;
    name: string;
    description: string;
    archived: boolean;
    permissions: string;
  }
): Promise<any> {
  var set: any = {};
  if (name) set.name = name;
  if (description) set.description = description;
  if (archived) set.action = archived;
  if (permissions) set.permissions = permissions;

  const record = await this.updateOne({ _id: id }, {
    $set: set
  });
  return record;
}

export async function updateRolePermission(
  this: Model<IRoleModel>,
  rolePermissions: IUpdateRolePermission
): Promise<any> {

  let add: any;
  let remove: any;
  if (rolePermissions.add_permissions && rolePermissions.add_permissions.length > 0) {
    var set: any = {};
    set.$addToSet = { permissions: rolePermissions.add_permissions };
    add = await this.updateOne({ _id: rolePermissions.id }, set);
  }

  if (rolePermissions.remove_permissions && rolePermissions.remove_permissions.length > 0) {
    var set: any = {};
    set.$pullAll = { permissions: rolePermissions.remove_permissions };
    remove = await this.updateOne({ _id: rolePermissions.id }, set);
  }

  // const record = await this.updateOne({ _id: rolePermissions.id }, set);
  return { add, remove };
}


export async function findRoleById(
  this: Model<IRoleModel>,
  id: string
): Promise<any> {
  const record = await this.find({ _id: id }).populate("permissions", "resource action attributes");
  if (record) {
    return record
  } else {
    return []
  }
}

export async function findRoleByName(
  this: Model<IRoleModel>,
  name: string
): Promise<any> {
  console.log(name, "nameeee")
  const record = await this.findOne({ name: name })
  if (record) {
    return record
  } else {
    return []
  }
}

export async function getAllRoles(
  this: Model<IRoleModel>,
  id: string
): Promise<any> {
  const record = await this.find().populate("permissions", "resource action attributes").sort({ "updatedAt": -1 })
  if (record) {
    return record
  } else {
    return []
  }
}

export async function getRoleAttribute(
  this: Model<IRoleModel>
): Promise<any> {
  // let schem = new Schema(this.schema)
  // let obj =  Object.keys(schem.obj.tree);
  // let valuesToRemove = ["_id", "__v", "id"] 
  // return  obj.filter((i) => (valuesToRemove.indexOf(i) === -1))
}