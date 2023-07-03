import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@lib/utils/interceptors';
import { PrometheusModule } from '@lib/modules/prometheus/prometheus.module';
import { LoggerConfig } from '@lib/config/logger.config';
import { LoggerModule } from '@lib/modules/logger';
import { HealthModule } from '@lib/modules';
import { HealthConfig } from '@lib/config/health.config';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    //
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
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {}
