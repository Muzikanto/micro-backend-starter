import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppConfig } from './modules/config/app.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfig);

  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder().setTitle('Example service').build();
    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(config.port);

  logger.debug(`Service available on http://0.0.0.0:${config.port}`);
}

bootstrap();
