import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example/example.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [ConfigModule, ExampleModule],
  providers: [],
})
export class AppModule {}
