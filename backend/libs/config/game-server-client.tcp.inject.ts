import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { ClientsModuleOptionsFactory } from '@nestjs/microservices';
import { GAME_SERVER_TCP_CONFIG_KEY } from './game-server-client.tcp.config';

const GAME_SERVER_CLIENT_TCP_KEY = (index: number): string => `GAME_SERVER_CLIENT_TCP_KEY:${index}`;
export const InjectGameServerTcpClient = (index = 0): ParameterDecorator => Inject(GAME_SERVER_CLIENT_TCP_KEY(index));
export const GameServerTcpClientProvider: (index?: number) => ClientsProviderAsyncOptions = (index = 0) => ({
  name: GAME_SERVER_CLIENT_TCP_KEY(index),
  useFactory: (config: ClientsModuleOptionsFactory) => {
    return config.createClientOptions();
  },
  inject: [GAME_SERVER_TCP_CONFIG_KEY(index)],
  imports: [],
});
