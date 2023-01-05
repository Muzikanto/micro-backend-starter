import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import {Logger} from "@nestjs/common";

const port = process.env.PORT || 4003;

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(ApplicationModule);
  await app.listen(port);

  logger.debug(`Service available on http://0.0.0.0:${port}`);
}
bootstrap();
