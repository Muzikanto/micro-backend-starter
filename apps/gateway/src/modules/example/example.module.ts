import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { EXAMPLE_TOKEN } from './utils/injection';
import { ExampleConfig } from '../config/example.config';
import { ConfigModule } from '../config/config.module';
import { MicroserviceProvider } from 'shared';

@Module({
  imports: [ConfigModule],
  controllers: [ExampleController],
  providers: [MicroserviceProvider.create(EXAMPLE_TOKEN, ExampleConfig)],
})
export class ExampleModule {}
