import * as SuperAgent from "superagent"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

let ROLE_SERVICE_URL = process.env.ROLE_SERVICE_URL || 'http://localhost:3002';

export class RoleService {
  constructor() { }

  getPermission(email: string, password: string): any {
    return new Promise((resolve, reject) => {
      if (!email) reject(new Error('email missing'));
      if (!password) reject(new Error('password missing'));

      SuperAgent
        .get(ROLE_SERVICE_URL + '/rbac/api/v1/permission/getPermission')
        .query({
          email,
          password
        })
        // .send({ email, password }) // sends a JSON post body
        // .set('accept', 'json')
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