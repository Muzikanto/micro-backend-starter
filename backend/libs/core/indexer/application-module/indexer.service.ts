import { Injectable } from '@nestjs/common';
import { IAddressLink } from '@lib/core/indexer/domain/types/address-link.types';
import { AddressLinkRepository } from '@lib/core/indexer/infrastructure-module/address-link.repository';
import { AddressLinkEntity } from '@lib/core/indexer/db-adapter';
import { httpProvider } from '@lib/core/indexer/application-module/indexer.subscribe';
import { Logger, LoggerService } from '@lib/modules';
import { AnalyzeAddressService } from '@lib/core/indexer/application-module/analyze-address';

@Injectable()
export class IndexerService {
  constructor(
    @Logger('Indexer') protected readonly logger: LoggerService,
    protected readonly addressLinkRepository: AddressLinkRepository,
    protected readonly analyzeAddressService: AnalyzeAddressService
  ) {}

  async handleBlock(blockHeight: number): Promise<void> {
    const startTime = new Date().getTime();

    const block = await httpProvider.getBlock(blockHeight);
    const transactionsHashes = block.transactions;

    let linksEntitiesMap: { [key: string]: [IAddressLink, number] } = {};

    this.logger.debug(`process block ${blockHeight} with ${transactionsHashes.length} transactions`);

    // save links
    for (let i = 0; i < transactionsHashes.length; i += 3) {
      const result = await Promise.allSettled(
        new Array(Math.min(3, transactionsHashes.length - i))
          .fill(0)
          .map((_, j) => this.parseTransaction(transactionsHashes[i + j]))
      );

      for (const row of result) {
        if (row.status === 'fulfilled') {
          const r = row.value;
          const linkId = `${r.from}-${r.to}`;

          if (linkId in linksEntitiesMap) {
            linksEntitiesMap[linkId][1]++;
          } else {
            linksEntitiesMap[linkId] = [new AddressLinkEntity({ from: r.from, to: r.to, id: linkId }), 1];
          }
        }
      }
    }

    const linksEntities = Object.values(linksEntitiesMap).map((el) => el[0]);

    if (linksEntities.length > 0) {
      const prevLinks = await this.addressLinkRepository.findByIds(linksEntities.map((el) => el.id));
      const linksMap = Object.fromEntries(prevLinks.map((el) => [el.id, el]));

      for (const linkEntity of linksEntities) {
        if (!(linkEntity.id in linksMap)) {
          linksMap[linkEntity.id] = this.addressLinkRepository.toDomain(linkEntity);
        }

        linksMap[linkEntity.id].entity.txCount++;
      }

      await this.addressLinkRepository.saveMany(Object.values(linksMap));
    }

    // analyze address
    await this.analyzeAddresses(linksEntities);

    //
    const endTime = new Date().getTime();
    this.logger.debug(`block ${blockHeight} handled (${((endTime - startTime) / 1000).toFixed(1)}s)`);
  }

  protected async parseTransaction(txHash: string): Promise<{ from: string; to: string }> {
    const tx = await httpProvider.getTransaction(txHash);
    const from = tx.from;
    const to = tx.to;

    return { from, to };
  }

  protected async analyzeAddresses(linksEntities: IAddressLink[]): Promise<void> {
    const addressMap = Object.fromEntries(
      [...linksEntities.map((el) => el.from), ...linksEntities.map((el) => el.to)].map((str) => [str, true])
    );

    for (const address in addressMap) {
      await this.analyzeAddressService.analyzeAddress(address);
    }
  }
}
