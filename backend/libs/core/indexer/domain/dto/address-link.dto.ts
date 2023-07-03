import { IAddressLinkDto } from '..';
import { TransformID } from '@lib/utils';

export class AddressLinkDto<TDate = number> implements IAddressLinkDto<TDate> {
  @TransformID()
  id!: string;

  @TransformID()
  from!: string;

  @TransformID()
  to!: string;
}
