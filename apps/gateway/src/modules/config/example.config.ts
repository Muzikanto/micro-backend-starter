import { Injectable } from '@nestjs/common';
import { MicroserviceProviderOptions } from '../../../../../packages/shared/src/modules/microservice/microservice.provider';

@Injectable()
export class ExampleConfig implements MicroserviceProviderOptions {
  public port = 4001;
  public host = '0.0.0.0';
}
