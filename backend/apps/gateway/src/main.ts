import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqOptions, TcpOptions } from '@nestjs/microservices';
import { LoggerService } from '@lib/modules/logger';
import { ResponseInterceptor } from '@lib/utils/interceptors/response.interceptor';
import { GatewayClientRmqConfig } from '@lib/config/gateway-client.rmq.config';
import { GatewayClientTcpConfig } from '@lib/config/gateway-client.tcp.config';
import { AppConfig } from '@lib/config/app.config';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  app.useLogger(await app.resolve(LoggerService));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = app.get(AppConfig);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Risk service')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('swagger', app, document);
  }

  const rmqOptions: RmqOptions = app.get(GatewayClientRmqConfig).createClientOptions();
  app.connectMicroservice(rmqOptions, { inheritAppConfig: false });

  const tcpOptions: TcpOptions = app.get(GatewayClientTcpConfig).createClientOptions();
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
