import { AddressLink, IAddressLinkDto } from '@lib/core/indexer/domain';
import { AddressLinkEntity } from '@lib/core/indexer/db-adapter';

export class AddressLinkMapper {
  public static toPersistence(domain: AddressLink): AddressLinkEntity {
    return domain.entity;
  }
  public static toDomain(entity: AddressLinkEntity): AddressLink {
    return new AddressLink(entity);
  }
  public static toResponse({ entity }: AddressLink): IAddressLinkDto {
    return {
      id: entity.id,
      from: entity.from,
      to: entity.to,
    };
  }
}
