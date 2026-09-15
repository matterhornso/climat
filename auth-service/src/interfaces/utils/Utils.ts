import moment from 'moment';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || ''
export class Utils {
  constructor() {
  }

  // Idle timeout, refreshed on every verified request — so this is time since
  // the last call, not time since login. The 900s default is what was
  // hardcoded here; SESSION_IDLE_TIMEOUT_SECONDS lets an environment choose a
  // longer window without a code change, which is what a demo or a long review
  // session needs. Deployments handling real accounts should leave it alone.
  verifyJwtBasedOnTime(date: any) {
    return new Promise<any>(async (resolve) => {
      const configured = Number(process.env['SESSION_IDLE_TIMEOUT_SECONDS']);
      const timeoutSeconds = Number.isFinite(configured) && configured > 0 ? configured : 900;
      const now = moment(new Date());
      const end = moment(new Date(date));
      const second = moment.duration(now.diff(end)).asSeconds();
      resolve(second <= timeoutSeconds);
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