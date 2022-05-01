import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './common/log/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    LoggerModule,
    UserModule
  ],
})
export class AppModule {}
