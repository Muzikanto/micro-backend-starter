import { Injectable } from '@nestjs/common';
import { MicroserviceProviderOptions } from 'shared';

@Injectable()
export class ExampleConfig implements MicroserviceProviderOptions {
  public port = 4001;
  public host = '0.0.0.0';
}
