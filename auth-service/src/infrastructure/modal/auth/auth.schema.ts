import { Schema } from "mongoose";
import { updateJwtTokenTime, verifyUser, verifyNewUser, updateJwtToken, saveJwtToken, verifyCaptcha, verifyOtp, logout, verifyJwtToken, destroyToken, saveOtp, saveAttempt } from "./auth.statics";

const AuthSchema = new Schema({
  uuid: String,
  loginId: String,
  email: String,
  jwtToken: String,
  userAgent: String,
  password: String,
  ipAddress: String,
  type: String,
  otp: String,
  captchaVerify: Boolean,
  otp_generate_time: {
    type: Date
  },
  secret: String,
  status: {
    type: String,
    enum: ['active', 'delete'],
    default: 'active'
  },
  attempt: {
    type: Number,
    default: 0,
  },
  resendOtp: {
    type: Boolean,
    default: false,
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
  token_generated_time: {
    type: Date
  },
});

AuthSchema.statics.saveJwtToken = saveJwtToken;
AuthSchema.statics.verifyJwtToken = verifyJwtToken;
AuthSchema.statics.destroyToken = destroyToken;
AuthSchema.statics.saveOtp = saveOtp;
AuthSchema.statics.verifyOtp = verifyOtp;
AuthSchema.statics.saveAttempt = saveAttempt;
AuthSchema.statics.logout = logout;
AuthSchema.statics.verifyCaptcha = verifyCaptcha;
AuthSchema.statics.updateJwtToken = updateJwtToken;
AuthSchema.statics.verifyUser = verifyUser;
AuthSchema.statics.updateJwtTokenTime = updateJwtTokenTime;
AuthSchema.statics.verifyNewUser = verifyNewUser;
export default AuthSchema;