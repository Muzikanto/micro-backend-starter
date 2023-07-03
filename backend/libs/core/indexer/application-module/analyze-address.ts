import { Injectable } from '@nestjs/common';
import { httpProvider } from '@lib/core/indexer/application-module/indexer.subscribe';
import { AddressRepository } from '@lib/core/indexer/infrastructure-module';
import { AddressEntity } from '@lib/core/indexer/db-adapter';
import { EthersService } from '@lib/modules';
import { ContractStandard } from '@lib/core/indexer/domain';

const cache: { [key: string]: boolean } = {};

@Injectable()
export class AnalyzeAddressService {
  constructor(
    protected readonly addressRepository: AddressRepository,
    protected readonly ethersService: EthersService
  ) {
    //
  }

  public async analyzeAddress(address: string): Promise<void> {
    // skip if exists
    if (address in cache) {
      return;
    }

    let row = await this.addressRepository.get(address);

    // skip if exists
    if (row) {
      return;
    }

    const isContract = await this.isContract(address);
    const entity = new AddressEntity({ id: address, isContract });

    if (isContract) {
      try {
        const name = await this.getContractName(address);
        entity.name = name;
      } catch (e) {
        // not found name method
      }
      try {
        const standard = await this.matchStandard(address);
        entity.standard = standard;
      } catch (e) {
        // ignore
      }
    }

    await this.addressRepository.save(this.addressRepository.toDomain(entity));

    row.commit();
  }

  //

  protected async isContract(address: string): Promise<boolean> {
    try {
      const code = await httpProvider.getCode(address);

      if (code !== '0x') return true;
    } catch (error) {
      // ignore
    }

    return false;
  }

  protected async getContractName(address: string): Promise<string> {
    const contract = this.ethersService.getContract(address, [
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ]);

    const name = await contract.name();

    return name;
  }

  protected async matchStandard(address: string): Promise<ContractStandard | undefined> {
    try {
      const ftContract = this.ethersService.getContract(address, [
        {
          inputs: [],
          name: 'decimals',
          outputs: [
            {
              internalType: 'uint8',
              name: '',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ]);

      const _ = await ftContract.decimals();

      return ContractStandard.Erc20;
    } catch (e) {
      //
    }

    try {
      const nftContract = this.ethersService.getContract(address, [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'tokenURI',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ]);

      const _ = await nftContract.tokenURI('1');

      return ContractStandard.Erc721;
    } catch (e) {
      //
    }
  }
}
