import * as speakeasy from "speakeasy"
import { NotificationService } from "../services/Notification.service";
import moment from 'moment';
const crypto = require('crypto');

export class Util2FA {
  step = 90;
  constructor() {

  }

  newSecret(uuid: string) {
    return speakeasy.generateSecret({ length: 20, name: uuid });
  }
  // Generates the login OTP. A fixed development OTP is used ONLY when the
  // AUTH_DEV_OTP env var is set (local dev, where there is no SMS/email
  // delivery to receive a real code). Every other environment gets a real
  // random 6-digit code, so no deployed build ships a universally-known
  // login code. Previously this returned a hardcoded 12121 unconditionally
  // in every environment — a P0 auth bypass (see SECURITY-FINDINGS.md).
  generateNewToken() {
    const devOtp = process.env.AUTH_DEV_OTP;
    if (devOtp) {
      return Number(devOtp);
    }
    return crypto.randomInt(100000, 1000000);
  }
  verifyToken(date: any) {
    console.log('date', date)
    return new Promise<any>(async (resolve, reject) => {
      var now = moment(new Date()); //todays date
      var end = moment(new Date(date)); // another date
      var duration = moment.duration(now.diff(end));
      var second = duration.asSeconds()
      let flag = second <= 90 ? true : false;
      resolve(flag)
    })
  }

  async sendMail(otp: string, receipt: any, jwtToken: string) {
    let data = { otp: otp, email: 'email' }
    await new NotificationService().sendPushNotification(
      JSON.stringify(receipt),
      "F2A",
      '',
      "web",
      jwtToken,
      data,
      "2FA login <> Shine",
      "Login Code is :" + otp)
  }


  async sendOtp(params: any) {
    //TODO write code for sms service
    return params.otp
  }
}


