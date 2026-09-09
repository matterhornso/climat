import {
  Schema
} from "mongoose";

import { findPermissionByActionAndResource, createPermissionInBulk, createPermission, findOneUpdate, findPermissionById, getAllPermissions } from "./permission.statics";

// TODO unique on combination
// TODO indexing

const PermissionSchema = new Schema<any>({
  resource: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  attributes: {
    type: String,
    required: true
  },
  transactions: [{
    id: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    }
  }]
  // role: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Role'
  // }
}, {
  timestamps: true
});

PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });


PermissionSchema.statics.createPermission = createPermission;
PermissionSchema.statics.findOneUpdate = findOneUpdate;
PermissionSchema.statics.findPermissionById = findPermissionById;
PermissionSchema.statics.getAllPermissions = getAllPermissions;
PermissionSchema.statics.findPermissionByActionAndResource = findPermissionByActionAndResource;
PermissionSchema.statics.createPermissionInBulk = createPermissionInBulk;

export default PermissionSchema;