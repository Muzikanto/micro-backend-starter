import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@lib/utils/interceptors';
import { LoggerModule } from '@lib/modules/logger';
import { ConfigModule } from './config.module';
import { LoggerConfig } from '@lib/config/logger.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { EthersModule, HealthModule, PrometheusModule } from '@lib/modules';
import { HealthConfig } from '@lib/config/health.config';
import { IndexerModule } from '@lib/core/indexer/application-module/indexer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from '@lib/config/typeorm.config';
import { EthersConfig } from '@lib/config/ethers.config';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: LoggerConfig,
    }),
    // metrics
    PrometheusModule,
    HealthModule.forRootAsync({
      useExisting: HealthConfig,
      imports: [ConfigModule],
    }),
    //
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeormConfig,
    }),
    EthersModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: EthersConfig,
    }),
    // app
    IndexerModule.forRootAsync(),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {}
