import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { ResponseInterceptor } from '@lib/utils/interceptors/response.interceptor';
import { LoggerService } from '@lib/modules/logger';
import { AppConfig } from '@lib/config/app.config';

const host = '0.0.0.0';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useLogger(await app.resolve(LoggerService));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = app.get(AppConfig);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(config.port, host);

  logger.debug(`Service is running on: ${await app.getUrl()}`);
}

bootstrap();
