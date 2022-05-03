import { Module } from '@nestjs/common';
import { LoggerModule } from './common/log/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './common/auth/auth.module';

import Configuration from './config';
import { CommonModule } from './common/module/common.module';
import { OrmLoggerService } from './common/log/logger.instance';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (
        configService: ConfigService,
        ormLoggerService: OrmLoggerService,
      ) => ({
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get('database.logging'),
        timezone: configService.get('database.timezone'),
        // 自定义日志
        logger: ormLoggerService,
      }),
      inject: [ConfigService, OrmLoggerService],
    }),
    CommonModule,
    LoggerModule,
    AuthModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
