import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EstateTransactionRequest } from './model/request';
import {
  ESTATE_TRANSACTION_REPOSITORY,
  type IEstateTransactionRepository,
} from './repository';

@Injectable()
export class EstateTransactionUsecase {
  constructor(
    @Inject(ESTATE_TRANSACTION_REPOSITORY)
    private repository: IEstateTransactionRepository,
  ) {}
  async getEstateTransactionValue(request: EstateTransactionRequest) {
    try {
      const result = await this.repository.queryTransactionValue(request);
      return result ?? '条件に該当する不動産取引のデータはありませんでした';
    } catch (error) {
      return new InternalServerErrorException(
        /* eslint-disable @typescript-eslint/no-unsafe-call */
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        error?.toString(),
        /* eslint-enable @typescript-eslint/no-unsafe-call */
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */
        'サーバーでエラーが起きました',
      );
    }
  }
}
