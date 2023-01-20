import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from './config.service';
import { AppConfig } from './app.config';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
  ],
  providers: [NestConfig.ConfigService, ConfigService, AppConfig],
  exports: [ConfigService],
})
export class ConfigModule {}
