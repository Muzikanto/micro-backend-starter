import { Module } from '@nestjs/common';
import { HeroesGameModule } from './modules/heroes/heroes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from 'shared/modules/typeorm';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      imports: [ConfigModule],
    }),
    HeroesGameModule,
  ],
})
export class ApplicationModule {}
