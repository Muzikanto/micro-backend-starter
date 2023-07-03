import { IAddress } from '@lib/core/indexer/domain';

export type IAddressDto<TDate = number> = Omit<IAddress, 'name' | 'standard'>;
