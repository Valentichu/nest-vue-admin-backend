import { Module, Global } from '@nestjs/common'
import { LoggerModule } from 'src/common/log/logger.module'

@Global()
@Module({
  imports: [LoggerModule],
  exports: [LoggerModule],
})
export class CommonModule {}
