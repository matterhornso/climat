import moment from 'moment';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || ''
export class Utils {
  constructor() {
  }

  verifyJwtBasedOnTime(date: any) {
    return new Promise<any>(async (resolve, reject) => {
      var now = moment(new Date()); //todays date
      var end = moment(new Date(date)); // another date
      var duration = moment.duration(now.diff(end));
      var second = duration.asSeconds()
      console.log('token time', second)
      let flag = second <= 900 ? true : false;
      resolve(flag)
    })
  }
  verifyJwt(token: string) {
    try {
      let verify = jwt.verify(token, SECRET_KEY);
      return true
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}