import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { NftLoaderClientRmqConfig } from './nft-loader-client.rmq.config';

const NFT_LOADER_RMQ_CLIENT_KEY = 'NFT_LOADER_CLIENT';
export const InjectNftLoaderRmqClient = (): ParameterDecorator => Inject(NFT_LOADER_RMQ_CLIENT_KEY);
export const NftLoaderClientRmqProvider: ClientsProviderAsyncOptions = {
  name: NFT_LOADER_RMQ_CLIENT_KEY,
  useClass: NftLoaderClientRmqConfig,
  imports: [],
};
