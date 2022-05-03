import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResultData } from '../data/result';

@Catch(HttpException)
export class GlobalExceptionFilter<T extends HttpException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const msg = exception.message;
    const result = new ResultData(status, msg);
    response
      .status(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(result);
  }
}
