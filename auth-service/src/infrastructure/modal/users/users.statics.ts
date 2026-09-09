import { IUserDocument, IUserModel } from "./users.types";
import { Model } from "mongoose";

export async function login(
  this: Model<IUserModel>,
  { email, password }: {
    email: string;
    password: string;
  }
): Promise<any> {
  const record = await this.findOne({ email: email, password: password }).select('fullName email departmentId uid accessId:')
  return record;
}