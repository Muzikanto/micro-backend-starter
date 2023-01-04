import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 4002;

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.debug(`Service available on http://0.0.0.0:${port}`);
}

bootstrap();
