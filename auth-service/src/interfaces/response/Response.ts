export interface IResponse {
  success: boolean,
  error: [],
  data: [],
  statusCode: number
}
export class Response implements IResponse {
  success!: boolean
  error!: [];
  data!: [];
  statusCode!: number

  sendResponseSuccess(data: any, status: boolean, statusCode: number = 200) {
    return {
      success: status,
      error: [],
      statusCode: statusCode,
      data: data
    }
  }
  sendResponseFailure(data: any, status: boolean, statusCode: number = 500) {
    return {
      success: status,
      statusCode: statusCode,
      error: data,
      data: []
    }
  }
}