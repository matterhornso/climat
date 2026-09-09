import { model } from "mongoose";
import { IAuthDocument, IAuthModel } from "./auth.types";
import AuthSchema from "./auth.schema";
export const AuthModel = model<IAuthDocument>("auth", AuthSchema) as IAuthModel;