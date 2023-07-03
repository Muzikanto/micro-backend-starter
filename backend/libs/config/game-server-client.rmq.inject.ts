import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { GameServerClientRmqConfig } from './game-server-client.rmq.config';

export const GAME_SERVER_CLIENT_RMQ_KEY = 'GAME_SERVER_CLIENT_RMQ';
export const InjectGameServerRmqClient = (): ParameterDecorator | PropertyDecorator =>
  Inject(GAME_SERVER_CLIENT_RMQ_KEY);
export const GameServerClientRmqProvider: ClientsProviderAsyncOptions = {
  name: GAME_SERVER_CLIENT_RMQ_KEY,
  useClass: GameServerClientRmqConfig,
  imports: [],
};
