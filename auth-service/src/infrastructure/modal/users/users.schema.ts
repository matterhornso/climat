import { Schema } from "mongoose";
import { login } from "./users.statics";

const UserSchema = new Schema({
  email: String,
  departmentId: String,
  creator: String,
  uid: String,
  password: String,
  accessId: Number,
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.statics.login = login;
export default UserSchema;
