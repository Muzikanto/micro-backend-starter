import { IAddressDto } from '..';
import { TransformBoolean, TransformID } from '@lib/utils';

export class AddressDto<TDate = number> implements IAddressDto<TDate> {
  @TransformID()
  id!: string;

  @TransformBoolean()
  isContract!: boolean;
}
