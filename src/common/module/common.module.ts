import { Module, Global } from '@nestjs/common';
import { LoggerModule } from 'src/common/log/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';

@Global()
@Module({
  imports: [LoggerModule],
  exports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class CommonModule {}
