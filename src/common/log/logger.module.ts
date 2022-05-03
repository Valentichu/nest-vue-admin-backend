import { Module } from '@nestjs/common';
import { OrmLoggerService, CommonLoggerService } from './logger.instance';

@Module({
  providers: [OrmLoggerService, CommonLoggerService],
  exports: [OrmLoggerService, CommonLoggerService],
})
export class LoggerModule {}
