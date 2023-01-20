import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { RpcValidationFilter } from 'shared';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port,
    },
  } as TcpOptions);
  app.useGlobalFilters(new RpcValidationFilter());

  await app.listen();

  logger.debug(`Service available on http://0.0.0.0:${port}`);
}

bootstrap();
