import { Document, Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
}

export interface IUserModel extends Model<IUserDocument> {
  login: (this: IUserModel, { email, password }: {
    email: string;
    password: string;
  }) => Promise<any>;
}