import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from 'shared/modules/config/config.service';
import { AppConfig } from 'shared/modules/config/app.config';

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
