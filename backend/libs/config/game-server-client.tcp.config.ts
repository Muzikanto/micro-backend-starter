import { ConfigService } from './config.service';
import { ClientsModuleOptionsFactory, TcpClientOptions, Transport } from '@nestjs/microservices';
import { Inject, Provider } from '@nestjs/common';

export const GAME_SERVER_TCP_CONFIG_KEY = (index = 0): string => `GAME_SERVER_TCP_CONFIG_KEY:${index}`;
export const InjectGameServerTcpConfig = (index = 0): ParameterDecorator => Inject(GAME_SERVER_TCP_CONFIG_KEY(index));
export const GameServerTcpConfigProvider: (index?: number) => Provider = (index = 0): Provider => ({
  provide: GAME_SERVER_TCP_CONFIG_KEY(index),
  useFactory: (configService: ConfigService): ClientsModuleOptionsFactory => {
    // TODO fix
    const host = configService.getString(`TCP_GAME_SERVER_${0}_HOST`);
    const port = configService.getNumber(`TCP_GAME_SERVER_${0}_PORT`);

    return {
      createClientOptions: (): TcpClientOptions => {
        return {
          transport: Transport.TCP,
          options: {
            port: port,
            host: host,
          },
        };
      },
    };
  },
  inject: [ConfigService],
});
