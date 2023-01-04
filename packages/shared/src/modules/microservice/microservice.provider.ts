import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Provider, Type } from '@nestjs/common';

export interface MicroserviceProviderOptions {
  port: number;
  host: string;
}

export class MicroserviceProvider {
  public static create(provide: string, Config: Type<MicroserviceProviderOptions>): Provider {
    return {
      provide: provide,
      useFactory: (exampleConfig: MicroserviceProviderOptions) => {
        return ClientProxyFactory.create({
          options: {
            host: exampleConfig.host,
            port: exampleConfig.port,
          },
          transport: Transport.TCP,
        });
      },
      inject: [Config],
    };
  }
}
