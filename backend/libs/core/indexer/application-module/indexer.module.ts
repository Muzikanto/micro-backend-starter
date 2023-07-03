import { DynamicModule, Module } from '@nestjs/common';
import { IndexerSubscribe } from '@lib/core/indexer/application-module/indexer.subscribe';
import { AddressInfrastructureModule } from '@lib/core/indexer/infrastructure-module';
import { IndexerService } from '@lib/core/indexer/application-module/indexer.service';
import { AnalyzeAddressService } from '@lib/core/indexer/application-module/analyze-address';

@Module({})
export class IndexerModule {
  public static forRootAsync(): DynamicModule {
    return {
      module: IndexerModule,
      imports: [AddressInfrastructureModule],
      providers: [IndexerService, IndexerSubscribe, AnalyzeAddressService],
    };
  }
}
