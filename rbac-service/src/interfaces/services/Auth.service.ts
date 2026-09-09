import * as SuperAgent from "superagent"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

let AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'https://localhost:3001';

export class AuthService {
  constructor() { }

  verifyToken(token: string): any {
    return new Promise((resolve, reject) => {
      if (!token) reject(new Error('token missing'));

      SuperAgent
        .post(AUTH_SERVICE_URL + '/auth/api/v1/auth/verifyToken')
        .send({
          token: token
        })
        .end((err, res) => {
          // Calling the end function will send the request
          if (err) {
            reject(new Error('An error occured with the user service, err: ' + err));
          }
          // TODO handle
          console.log(res.body);
          resolve(res.body);
        });
    });
  }
}