import { DomainBase } from '@lib/utils';
import { IAddressLink } from '@lib/core/indexer/domain';

export class AddressLink extends DomainBase {
  constructor(public entity: IAddressLink) {
    super();
  }

  get id() {
    return this.entity.id;
  }
}
