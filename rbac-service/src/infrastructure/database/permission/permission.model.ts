import { model } from "mongoose";
import PermissionSchema from "./permission.schema";
import { IPermissionDocument, IPermissionModel } from "./permission.types";
export const PermissionModel = model<IPermissionDocument>("permission", PermissionSchema) as IPermissionModel;