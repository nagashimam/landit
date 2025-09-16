import { Inject, Injectable } from '@nestjs/common';
import { IEstateTransactionRepository } from './repository';
import { readFile } from 'fs/promises';
import { EstateTransactionRequest } from './model/request';
import { TransactionJsonSchema } from './model/transaction.schema';

import { PATH_TO_RESOURCE } from './constants';

@Injectable()
export class EstateTransactionJsonInfrastructure
  implements IEstateTransactionRepository
{
  constructor(@Inject(PATH_TO_RESOURCE) private pathToJson: string) {}

  async queryTransactionValue(
    request: EstateTransactionRequest,
  ): Promise<number | undefined> {
    const { prefectureCode, type } = request;
    const year = Number(request.year);

    try {
      const data = await readFile(this.pathToJson, { encoding: 'utf8' });
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      const jsonData = JSON.parse(data);
      /* eslint-enable @typescript-eslint/no-unsafe-assignment */

      // Zodスキーマで検証と型変換
      const transactions = TransactionJsonSchema.parse(jsonData);

      const queriedTransaction = transactions.find((transaction) => {
        return (
          transaction.year === year &&
          transaction.prefectureCode === prefectureCode &&
          transaction.type === type
        );
      });
      return queriedTransaction
        ? queriedTransaction.data.result.years[0].value
        : undefined;
    } catch (error) {
      // ZodErrorや他のエラーをラップして、より詳細な情報を提供
      throw new Error('不動産取引価格データの取得または検証に失敗しました', {
        cause: error,
      });
    }
  }
}
