import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultData } from '../vo/result';
import { Logger } from '../log/logger.instance';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const msg =
      exception instanceof HttpException
        ? exception.message
        : '服务器内部错误，请联系管理员';
    const result = new ResultData(status, msg);
    if (status >= 500) {
      this.logger.error(exception);
    }
    response
      .status(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(result);
  }
}
