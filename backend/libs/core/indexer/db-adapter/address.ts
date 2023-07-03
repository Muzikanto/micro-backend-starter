import { Column, Entity, PrimaryColumn } from 'typeorm';
import {ContractStandard, IAddress} from '../domain';

@Entity({ name: 'address' })
export class AddressEntity implements IAddress {
  constructor(data: Pick<IAddress, 'id' | 'isContract' | 'name' | 'standard'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'bool', default: false })
  isContract: boolean = false;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  standard?: ContractStandard;
}
