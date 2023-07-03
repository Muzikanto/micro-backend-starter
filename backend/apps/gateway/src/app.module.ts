import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@lib/utils/interceptors';
import { LoggerModule } from '@lib/modules/logger';
import { ConfigModule } from './config.module';
import { LoggerConfig } from '@lib/config/logger.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule, PrometheusModule } from '@lib/modules';
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
