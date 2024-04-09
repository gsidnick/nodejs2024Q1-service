import {
  ExceptionFilter as IExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';
import { PORT } from 'src/constants';

@Catch()
export class ExceptionFilter implements IExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse();
    const req: Request = host.switchToHttp().getRequest();

    let statusCode: number;
    let message: string;

    try {
      statusCode = exception.getStatus();
      message = exception?.message || '';
    } catch {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const { method, protocol, hostname, originalUrl, body, query } = req;
    const url = `${protocol}://${hostname}:${PORT}${originalUrl}`;
    const errorMessage = exception?.message || '';
    const logMessage = `[Error Message]${errorMessage} :: [Error Stack]${exception} :: [${method}] :: [URL]${url} :: [Request Body]${JSON.stringify(
      body,
    )} :: [Query Params]${JSON.stringify(
      query,
    )} :: [Response Status]${statusCode}`;

    this.logger.error(logMessage);

    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
