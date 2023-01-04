import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example/example.module';
import { ConfigModule } from './modules/config/config.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    ExampleModule,
  ],
  providers: [],
})
export class AppModule {}
