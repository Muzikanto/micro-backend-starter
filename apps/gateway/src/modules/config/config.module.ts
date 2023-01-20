import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { AppConfig } from './app.config';
import { ExampleConfig } from './example.config';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
  ],
  providers: [NestConfig.ConfigService, ConfigService, AppConfig, ExampleConfig],
  exports: [ConfigService, AppConfig, ExampleConfig],
})
export class ConfigModule {}
