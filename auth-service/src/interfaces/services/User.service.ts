import * as SuperAgent from "superagent"
import logger from '../../infrastructure/logger/logger';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

let USER_SERVICE_URL = process.env.USER_SERVICE_URL

logger.debug("UserService URL " + USER_SERVICE_URL);

export class UserService {
  constructor() { }

  getUserByEmailPassword(email: string, password: string): any {
    return new Promise((resolve, reject) => {
      if (!email) reject(new Error('email missing'));
      if (!password) reject(new Error('password missing'));
      SuperAgent
        .get(USER_SERVICE_URL + '/api/v1/users/getUserByEmailPassword')
        .query({
          email,
          password
        })
        .end((err, res) => {
          // console.log("auth getUserByEmailPassword", err, res);
          // Calling the end function will send the request
          if (err) {
            return reject(new Error('An error occurred with the user service, err: ' + err));
          }
          if (!res || !res.body) return reject(new Error('An error occurred with the user service, err: ' + err));
          resolve(res.body);
        });
    });
  }
  getOrgByDepartmentId(id: string): any {
    return new Promise((resolve, reject) => {
      if (!id) reject(new Error('id missing'));
      SuperAgent
        .get(USER_SERVICE_URL + '/api/v1/department/getOrgByDepartmentId')
        .query({
          id
        })
        .end((err, res) => {
          // Calling the end function will send the request
          if (err) {
            return reject(new Error('An error occurred with the user service, err: ' + err));
          }
          if (!res || !res.body) return reject(new Error('An error occurred with the user service, err: ' + err));
          resolve(res.body);
        });
    });
  }
  verifyUser(uuid: string): any {
    return new Promise((resolve, reject) => {
      if (!uuid) reject(new Error('uuid missing'));
      SuperAgent
        .post(USER_SERVICE_URL + '/api/v1/users/verifyOnboardingUser')
        .query({
          uuid
        })
        .end((err, res) => {
          // Calling the end function will send the request
          if (err) {
            return reject(new Error('An error occurred with the user service, err: ' + err));
          }
          if (!res || !res.body) return reject(new Error('An error occurred with the user service, err: ' + err));
          resolve(res.body);
        });
    });
  }
}
