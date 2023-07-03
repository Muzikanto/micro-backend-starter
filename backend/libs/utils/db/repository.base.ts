import { DomainBase, IMapper } from '../ddd';
import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line
export abstract class RepositoryBase<
  Domain extends DomainBase<{ id: string }>,
  Entity extends ObjectLiteral & { id: string }
> {
  protected repo: Repository<Entity>;

  protected constructor(
    protected readonly mapper: IMapper<any, any>,
    protected readonly eventPublisher: EventPublisher,
    protected readonly dataSource: DataSource,
    protected readonly entity: EntityTarget<Entity>
  ) {
    this.repo = this.dataSource.getRepository(this.entity);
  }

  public async get(id: string | number): Promise<Domain | null> {
    // eslint-disable-next-line
    const entity = await this.repo.findOne({ where: { id: String(id) } as any });

    return entity ? this.toDomain(entity) : null;
  }

  public async getUnwrap(id: string): Promise<Domain> {
    const item = await this.get(id);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  public async findByIds(ids: string[]): Promise<Domain[]> {
    const qb = this.repo.createQueryBuilder('entity').where('entity.id in (:...ids)', { ids: ids });

    const arr = await qb.getMany();

    return arr.map((el) => this.toDomain(el));
  }

  public async save(domain: Domain, opts: { repo?: Repository<Entity>; manager?: EntityManager } = {}): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;

    await repo.save(this.mapper.toPersistence(domain), {
      reload: false,
    });
  }

  public async saveMany(domains: Domain[], opts: { manager?: EntityManager } = {}): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;

    await repo.save(domains.map((el) => this.mapper.toPersistence(el)));
  }

  public async update(
    domain: Domain & { id: string },
    fields: Array<keyof Entity>,
    opts: { manager?: EntityManager } = {}
  ): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;
    const entity = this.mapper.toPersistence(domain);
    const part = fields
      .map((field) => ({ field, data: entity[field] }))
      .reduce((acc, el) => ({ ...acc, [el.field]: el.data }), {});

    await repo.createQueryBuilder().update().where('id = :id', { id: domain.id }).set(part).execute();
  }

  public toDomain(entity: Entity): Domain {
    const domain = this.mapper.toDomain(entity);
    const domainWithCtx = this.eventPublisher.mergeObjectContext(domain);

    return domainWithCtx;
  }
}
