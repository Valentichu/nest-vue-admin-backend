import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultData } from '../data/result.data';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<ResultData> {
    return next
      .handle()
      .pipe(map((data) => new ResultData(HttpStatus.OK, null, data)));
  }
}
