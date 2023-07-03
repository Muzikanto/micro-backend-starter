import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { IEthersFactory, IEthersOptions } from '../modules/ethers';

@Injectable()
export class EthersConfig implements IEthersFactory {
  constructor(protected readonly configService: ConfigService) {
    //
  }

  public createEthersOptions(): IEthersOptions {
    return {
      rpcUrl: this.configService.getString('ETHERS_RPC'),
      network: this.configService.getNumber('ETHERS_NETWORK'),
    };
  }
}
