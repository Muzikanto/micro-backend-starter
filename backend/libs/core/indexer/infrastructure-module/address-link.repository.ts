import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { AddressLinkEntity } from '../db-adapter';
import { AddressLink, AddressLinkMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { RepositoryBase } from '@lib/utils';

@Injectable()
export class AddressLinkRepository extends RepositoryBase<AddressLink, AddressLinkEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(AddressLinkMapper, eventPublisher, dataSource, AddressLinkEntity);
  }

  public async saveMany(domains: AddressLink[], opts: { manager?: EntityManager } = {}): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;
    const entities = domains.map((el) => this.mapper.toPersistence(el));

    await repo.save(entities);
  }
}
