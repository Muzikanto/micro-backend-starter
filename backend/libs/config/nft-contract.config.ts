import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { IContractFactory, IContractOptions } from '../modules/contract';
import { NFT_ABI } from './nft.abi';

@Injectable()
export class NftContractConfig implements IContractFactory {
  constructor(protected readonly configService: ConfigService) {
    //
  }

  public createContractOptions(): IContractOptions {
    return {
      abi: NFT_ABI,
      privateKey: this.configService.getString('NFT_PRIVATE_KEY'),
      contractId: this.configService.getString('NFT_CONTRACT_ID'),
    };
  }
}
