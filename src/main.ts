import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { Logger } from './common/log/logger.instance';
import { setupSwagger } from './common/doc/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalFilters(new GlobalExceptionFilter(app.get(Logger)));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useLogger(app.get(Logger));
  setupSwagger(app);

  await app.listen(8080);
}
bootstrap();
