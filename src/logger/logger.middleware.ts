import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { LoggerService } from './logger.service';
import { PORT } from '../constants';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, protocol, hostname, originalUrl, body, query } = req;
    const resWrite = res.write;
    const resEnd = res.end;
    const chunks = [];
    let responseBody: string;

    res.write = (chunk, ...rest) => {
      chunks.push(chunk);
      return resWrite.call(res, chunk, ...rest);
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.end = (chunk, ...rest) => {
      if (chunk && typeof chunk !== 'function') chunks.push(chunk);
      responseBody = Buffer.concat(chunks).toString('utf8');
      resEnd.call(res, chunk, ...rest);
    };

    finished(res, () => {
      const { statusCode } = res;
      const url = `${protocol}://${hostname}:${PORT}${originalUrl}`;
      const message = `[${method}] :: [URL]${url} :: [Request Body]${JSON.stringify(
        body,
      )} :: [Query Params]${JSON.stringify(
        query,
      )} :: [Response Status]${statusCode} :: [Response Body]${responseBody}`;

      this.logger.log(message);
    });

    next();
  }
}
