import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ICreateIpfsConfigOptions, IIpfsConfig } from '../modules/ipfs';

@Injectable()
export class IpfsConfig implements ICreateIpfsConfigOptions {
  public readonly url: string;

  constructor(configService: ConfigService) {
    this.url = configService.getString('IPFS_URL');
  }

  createIpfsOptions(): IIpfsConfig {
    return {
      url: this.url,
    };
  }
}
