import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example/example.module';
import { ConfigModule } from './modules/config/config.module';
import { HealthModule } from './modules/health';

@Module({
  imports: [ConfigModule, ExampleModule, HealthModule],
  providers: [],
})
export class AppModule {}
