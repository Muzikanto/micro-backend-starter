import { IAddressLink } from '@lib/core/indexer/domain';

export type IAddressLinkDto<TDate = number> = Omit<IAddressLink<TDate>, 'updatedAt' | 'txCount'>;
