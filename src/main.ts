import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { CommonLoggerService } from './common/log/logger.instance';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

import { setupSwagger } from './common/doc/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useLogger(app.get(CommonLoggerService));
  setupSwagger(app);

  await app.listen(8080);
}
bootstrap();
