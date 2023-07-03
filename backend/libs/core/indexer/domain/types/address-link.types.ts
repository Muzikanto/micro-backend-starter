export type IAddressLink<TDate = Date> = {
  id: string;
  from: string;
  to: string;
  txCount: number;
  updatedAt: TDate
};
