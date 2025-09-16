import { EstateTransactionRequest } from './model/request';

export const ESTATE_TRANSACTION_REPOSITORY = 'ESTATE_TRANSACTION_REPOSITORY';

export interface IEstateTransactionRepository {
  queryTransactionValue(
    request: EstateTransactionRequest,
  ): Promise<number | undefined>;
}
