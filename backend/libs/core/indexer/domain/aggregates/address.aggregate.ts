import { DomainBase } from '@lib/utils';
import { IAddress } from '@lib/core/indexer/domain';

export class Address extends DomainBase {
  constructor(public entity: IAddress) {
    super();
  }

  get id() {
    return this.entity.id;
  }
}
