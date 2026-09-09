import {
  Schema
} from "mongoose";

import { createRole, createRoleBulk, findOneUpdate, findRoleById, findRoleByName, getAllRoles, getRoleAttribute, updateRolePermission } from "./role.statics";

const RoleSchema = new Schema<any>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  archived: {
    type: Boolean,
    default: false,
    required: true
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'permission'
  }]
}, {
  timestamps: true
});

RoleSchema.statics.createRole = createRole;
RoleSchema.statics.createRoleBulk = createRoleBulk;
RoleSchema.statics.findOneUpdate = findOneUpdate;
RoleSchema.statics.findRoleById = findRoleById;
RoleSchema.statics.findRoleByName = findRoleByName;
RoleSchema.statics.getAllRoles = getAllRoles;
RoleSchema.statics.updateRolePermission = updateRolePermission;
RoleSchema.statics.getRoleAttribute = getRoleAttribute;


export default RoleSchema;