import { EntityBase } from './entity.base';

// eslint-disable-next-line
export interface IMapper<Domain extends EntityBase<any>, DbRecord, Response = any> {
  toPersistence(domain: Domain): DbRecord;
  toDomain(entity: any): Domain;
  toResponse(domain: Domain, opts: any): Response;
}
