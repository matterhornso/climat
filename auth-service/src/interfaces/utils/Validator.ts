
export class APIValidator {
  constructor() {

  }
  validateLoginAPI = (data: any) => {
    if (!data.email) {
      return { status: false, message: 'no email found' }

    }
    if (data.email == "" || data.length == 0) {
      return { status: false, message: 'no email found' }

    }
    if (!data.password) {
      return { status: false, message: 'no password found' }

    }
    if (!data.captcha) {
      return { status: false, message: 'no captcha found' }

    }
    if (!data.id) {
      return { status: false, message: 'no id found' }
    }
    return { status: true }
  }
}