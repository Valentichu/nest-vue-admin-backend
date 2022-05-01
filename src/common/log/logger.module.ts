import { Module, Global } from '@nestjs/common';
import { Logger } from './logger.instance';

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
