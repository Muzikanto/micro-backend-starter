import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AddressEntity } from '../db-adapter';
import { Address, AddressMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { RepositoryBase } from '@lib/utils';

@Injectable()
export class AddressRepository extends RepositoryBase<Address, AddressEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(AddressMapper, eventPublisher, dataSource, AddressEntity);
  }
}
