import { Module } from '@nestjs/common';
import { HeroesGameModule } from './modules/heroes/heroes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './modules/config';
import { TypeormConfig } from './modules/config/typeorm.config';
import { HealthModule } from './modules/health';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      imports: [ConfigModule],
    }),
    HealthModule,
    HeroesGameModule,
  ],
})
export class ApplicationModule {}
