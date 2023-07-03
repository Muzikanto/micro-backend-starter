import { Address, IAddressDto } from '@lib/core/indexer/domain';
import { AddressEntity } from '@lib/core/indexer/db-adapter';

export class AddressMapper {
  public static toPersistence(domain: Address): AddressEntity {
    return domain.entity;
  }
  public static toDomain(entity: AddressEntity): Address {
    return new Address(entity);
  }
  public static toResponse({ entity }: Address): IAddressDto {
    return {
      id: entity.id,
      isContract: entity.isContract,
    };
  }
}
