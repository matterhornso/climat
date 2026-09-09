import { Model } from "mongoose";
import { IPermissionModel } from "./permission.types";

export async function createPermission(
  this: Model<IPermissionModel>,
  { resource, action, attributes, transactionId }: {
    resource: string;
    action: string;
    attributes: string;
    transactionId: string
  }
): Promise<any> {
  return await this.create({ resource, action, attributes, transactions: [{ id: transactionId }] })
  // TODO throw db error
}

export async function findOneUpdate(
  this: Model<IPermissionModel>,
  { id, resource, action, attributes }: {
    id: string;
    resource: string;
    action: string;
    attributes: string;
    // role: string;
  }
): Promise<any> {
  var set: any = {};
  if (resource) set.resource = resource;
  if (action) set.action = action;
  if (attributes) set.attributes = attributes;
  // if (role) set.role = role;

  const record = await this.updateOne({ _id: id }, {
    $set: set
  })
  return record;
}

export async function findPermissionById(
  this: Model<IPermissionModel>,
  id: string
): Promise<any> {
  const record = await this.find({ _id: id });
  if (record) {
    return record
  } else {
    return []
  }
}

export async function getAllPermissions(
  this: Model<IPermissionModel>,
  id: string
): Promise<any> {
  const record = await this.find({})
  if (record) {
    return record
  } else {
    return []
  }
}
export async function findPermissionByActionAndResource(
  this: Model<IPermissionModel>,
  action: string,
  resource: string
): Promise<any> {
  const record = await this.findOne({ action: action, resource: resource })
  if (record) {
    return record
  } else {
    return []
  }
}
export async function createPermissionInBulk(
  this: Model<IPermissionModel>,
  permissions: any
): Promise<any> {
  try {
    console.log('createPermissionInBulk', permissions)
    let bulk_permission_res = await this.insertMany(permissions.new_permission)
    return bulk_permission_res
  } catch (e) {
    console.log(e);
  }

  // TODO throw db error
}