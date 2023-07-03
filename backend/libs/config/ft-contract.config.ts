import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { IContractFactory, IContractOptions } from '../modules/contract';
import { FT_ABI } from './ft.abi';

@Injectable()
export class FtContractConfig implements IContractFactory {
  constructor(protected readonly configService: ConfigService) {
    //
  }

  public createContractOptions(): IContractOptions {
    return {
      abi: FT_ABI,
      privateKey: this.configService.getString('FT_PRIVATE_KEY'),
      contractId: this.configService.getString('FT_CONTRACT_ID'),
    };
  }
}
