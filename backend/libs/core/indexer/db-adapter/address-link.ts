import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IAddressLink } from '@lib/core/indexer/domain/types/address-link.types';

@Entity({ name: 'address_link' })
export class AddressLinkEntity implements IAddressLink {
  constructor(data: Pick<IAddressLink, 'id' | 'from' | 'to'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  from!: string;

  @Column({ type: 'varchar', length: 255 })
  to!: string;

  @Column({ type: 'int', default: 0 })
  txCount: number = 0;

  @Column({ type: 'timestamp', default: 'now()', onUpdate: 'now()' })
  updatedAt: Date = new Date();
}
