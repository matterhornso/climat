
export class Logger {
  loggingBunyan: any
  logger: any
  constructor() {
  }
  async log(log: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // this.logger.info(log)
      console.log(log)
    })
  }
}