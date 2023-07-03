import { Injectable } from '@nestjs/common';
import { WebSocketProvider, JsonRpcProvider } from 'ethers';
import { IndexerService } from '@lib/core/indexer/application-module/indexer.service';
import { Logger, LoggerService } from '@lib/modules';

const provider = new WebSocketProvider(
  'wss://tiniest-polished-pallet.matic-testnet.discover.quiknode.pro/d6313d97d280eea85f42754659d7be7ec0b4e32a/'
);
export const httpProvider = new JsonRpcProvider(
  'https://tiniest-polished-pallet.matic-testnet.discover.quiknode.pro/d6313d97d280eea85f42754659d7be7ec0b4e32a/'
);

let isSubscribed = false;

@Injectable()
export class IndexerSubscribe {
  constructor(
    @Logger('Indexer') protected readonly logger: LoggerService,
    protected readonly indexerService: IndexerService
  ) {
    this.subscribe();
  }

  subscribe(): void {
    if (isSubscribed) {
      return;
    }

    isSubscribed = true;

    this.indexerService.handleBlock(37448426).then();

    // provider.on('block', (blockHeight: number) => {
    //   this.indexerService.handleBlock(blockHeight);
    // });
  }
}
