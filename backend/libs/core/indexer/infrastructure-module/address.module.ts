import { Module } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AddressEntity, AddressLinkEntity} from '@lib/core/indexer/db-adapter';
import {AddressLinkRepository} from "@lib/core/indexer/infrastructure-module/address-link.repository";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AddressEntity, AddressLinkEntity])],
  providers: [AddressRepository, AddressLinkRepository],
  exports: [AddressRepository, AddressLinkRepository],
})
export class AddressInfrastructureModule {}
