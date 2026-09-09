import { model } from "mongoose";
import RoleSchema from "./role.schema";
import { IRoleDocument, IRoleModel } from "./role.types";
export const RoleModel = model<IRoleDocument>("role", RoleSchema) as IRoleModel;

console.log("attribute",Object.keys(RoleModel.schema.paths))
