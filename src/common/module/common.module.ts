import { Module, Global } from '@nestjs/common';
import { LoggerModule } from 'src/common/log/logger.module';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../auth/jwt.guard';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';

@Global()
@Module({
  imports: [LoggerModule],
  exports: [LoggerModule],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class CommonModule {}
