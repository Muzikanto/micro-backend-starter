import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@lib/config/config.service';
import { LoggerConfig } from '@lib/config/logger.config';
import { AppConfig } from '@lib/config/app.config';
import path from 'path';
import { HealthConfig } from '@lib/config/health.config';
import { TypeormConfig } from '@lib/config/typeorm.config';
import { EthersConfig } from '@lib/config/ethers.config';

const providers = [
  ConfigService,
  AppConfig,
  LoggerConfig,
  // metrics
  HealthConfig,
  //
  TypeormConfig,
  EthersConfig,
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/indexer/.env.local'), path.resolve('./apps/indexer/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...providers],
  exports: [...providers],
})
export class ConfigModule {}
