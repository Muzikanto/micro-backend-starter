import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example/example.module';
import { ConfigModule } from './modules/config/config.module';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule,
    ExampleModule,
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [{ name: 'microservice', url: 'http://0.0.0.0:4002/graphql' }],
        }),
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
