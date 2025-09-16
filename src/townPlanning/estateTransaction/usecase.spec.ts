import { Test, TestingModule } from '@nestjs/testing';
import { EstateTransactionUsecase } from './usecase';
import {
  ESTATE_TRANSACTION_REPOSITORY,
  IEstateTransactionRepository,
} from './repository';
import { InternalServerErrorException } from '@nestjs/common';
import { EstateTransactionRequest } from './model/request';

describe('EstateTransactionUsecase', () => {
  let usecase: EstateTransactionUsecase;
  let repository: IEstateTransactionRepository;

  const mockRepository = {
    queryTransactionValue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstateTransactionUsecase,
        {
          provide: ESTATE_TRANSACTION_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    usecase = module.get<EstateTransactionUsecase>(EstateTransactionUsecase);
    repository = module.get<IEstateTransactionRepository>(
      ESTATE_TRANSACTION_REPOSITORY,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEstateTransactionValue', () => {
    const request: EstateTransactionRequest = {
      year: 2018,
      prefectureCode: '13',
      type: '1',
    };

    it('リポジトリが価格を返した場合、その値を返す', async () => {
      const expectedValue = 100;
      mockRepository.queryTransactionValue.mockResolvedValue(expectedValue);

      const result = await usecase.getEstateTransactionValue(request);

      expect(result).toBe(expectedValue);
      /* eslint-disable @typescript-eslint/unbound-method */
      expect(repository.queryTransactionValue).toHaveBeenCalledWith(request);
      /* eslint-enable @typescript-eslint/unbound-method */
    });

    it('リポジトリがundefinedを返した場合、メッセージを返す', async () => {
      const expectedMessage =
        '条件に該当する不動産取引のデータはありませんでした';
      mockRepository.queryTransactionValue.mockResolvedValue(undefined);

      const result = await usecase.getEstateTransactionValue(request);

      expect(result).toBe(expectedMessage);
    });

    it('リポジトリがエラーをスローした場合、InternalServerErrorExceptionを返す', async () => {
      const error = new Error('DB error');
      mockRepository.queryTransactionValue.mockRejectedValue(error);

      const result = await usecase.getEstateTransactionValue(request);

      expect(result).toBeInstanceOf(InternalServerErrorException);
      expect((result as InternalServerErrorException).getResponse()).toEqual({
        message: error.toString(),
        error: 'サーバーでエラーが起きました',
        statusCode: 500,
      });
    });
  });
});
