import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultData } from '../vo/result';
import { CommonLoggerService } from '../log/logger.instance';

@Catch(HttpException)
export class GlobalExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  constructor(private readonly commonLoggerService: CommonLoggerService) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const msg = exception.message;
    const result = new ResultData(status, msg);
    if (status >= 500) {
      this.commonLoggerService.error(exception);
    }
    response
      .status(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(result);
  }
}
