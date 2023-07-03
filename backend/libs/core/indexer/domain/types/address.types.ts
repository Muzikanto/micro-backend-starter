export enum ContractStandard {
  Erc20 = 'Erc20',
  Erc721 = 'Erc721',
}
export type IAddress = {
  id: string;
  isContract: boolean;
  name?: string;
  standard?: ContractStandard;
};
