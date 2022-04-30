import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { setupSwagger } from './common/doc/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  setupSwagger(app);

  await app.listen(8080);
}
bootstrap();
