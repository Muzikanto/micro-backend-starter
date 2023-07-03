import { Module } from '@nestjs/common';
import { ExceptionInterceptor } from '@lib/utils/interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule, LoggerModule, PrometheusModule } from '@lib/modules';
import { HealthConfig } from '@lib/config/health.config';
import { ConfigModule } from '@app/gateway/src/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerConfig } from '@lib/config/logger.config';

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
