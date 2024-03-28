import { LoggerService as ILoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService implements ILoggerService {
  log(data: any) {
    /* your implementation */
  }

  error(data: any) {
    /* your implementation */
  }

  warn(data: any) {
    /* your implementation */
  }

  debug?(data: any) {
    /* your implementation */
  }

  verbose?(data: any) {
    /* your implementation */
  }
}
