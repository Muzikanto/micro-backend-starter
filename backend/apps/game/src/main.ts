import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqOptions, TcpOptions } from '@nestjs/microservices';
import { AppConfig } from '@lib/config/app.config';
import { ResponseInterceptor } from '@lib/utils/interceptors/response.interceptor';
import { LoggerService } from '@lib/modules/logger';
import { GAME_SERVER_TCP_CONFIG_KEY } from '@lib/config/game-server-client.tcp.config';
import { GameServerClientRmqConfig } from '@lib/config/game-server-client.rmq.config';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  const config: AppConfig = app.get(AppConfig);

  app.useLogger(await app.resolve(LoggerService));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Risk game server')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('swagger', app, document);
  }

  const rmqOptions: RmqOptions = app.get(GameServerClientRmqConfig).createClientOptions();
  app.connectMicroservice(rmqOptions, { inheritAppConfig: false });

  const tcpOptions: TcpOptions = app.get(GAME_SERVER_TCP_CONFIG_KEY()).createClientOptions();
  app.connectMicroservice(tcpOptions, { inheritAppConfig: false });

  await app.startAllMicroservices();
  await app.listen(config.port, '0.0.0.0');

  logger.debug(`Service available on amqp://${rmqOptions.options!.queue}`);
  logger.debug(`Service available on tcp://${tcpOptions.options!.host}:${tcpOptions.options!.port}`);
  logger.debug(`Service is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  console.log(err);
  throw err;
});
