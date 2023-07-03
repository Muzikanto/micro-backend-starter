import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@lib/config/config.service';
import { AppConfig } from '@lib/config';
import { LoggerConfig } from '@lib/config/logger.config';
import { GameServerClientRmqConfig } from '@lib/config/game-server-client.rmq.config';
import { GameServerTcpConfigProvider } from '@lib/config/game-server-client.tcp.config';
import path from 'path';
import { HealthConfig } from '@lib/config/health.config';

const providers = [
  ConfigService,
  AppConfig,
  LoggerConfig,
  //
  GameServerClientRmqConfig,
  GameServerTcpConfigProvider(),
  //
  HealthConfig,
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/game/.env.local'), path.resolve('./apps/game/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...providers],
  exports: [...providers],
})
export class ConfigModule {}
