import * as SuperAgent from "superagent"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

let USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3000';

export class UserService {
  constructor() { }

  // TODO jwttoken
  getUserRoles(user_uuid: string, jwtToken: string): any {
    return new Promise((resolve, reject) => {
      if (!user_uuid) reject(new Error('user_uuid missing'));

      SuperAgent
        .get(USER_SERVICE_URL + '/user/api/v1/users/getUserRolesByUUID')
        .set('Authorization', 'Bearer ' + jwtToken)
        .query({
          user_uuid
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
  getDepartmentByIDS(ids: any, jwtToken: string): any {
    return new Promise((resolve, reject) => {
      if (!ids) reject(new Error('ids missing'));
      SuperAgent
        .post(USER_SERVICE_URL + '/user/api/v1/department/findDepartmentByIDs')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({
          id: ids
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