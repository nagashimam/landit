import { Test, TestingModule } from '@nestjs/testing';
import { EstateTransactionJsonInfrastructure } from './json-infrastructure';
import { PrefectureService } from './model/prefecture';
import { YearService } from './model/year';
import { TypeService } from './model/type';
import * as fs from 'fs/promises';
import { EstateTransactionRequest } from './model/request';
import { PATH_TO_RESOURCE } from './constants';

jest.mock('fs/promises');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('EstateTransactionJsonInfrastructure', () => {
  let infrastructure: EstateTransactionJsonInfrastructure;

  const mockTransactionData = [
    {
      year: 2018,
      prefectureCode: 13, // Zod will coerce this to '13'
      type: 1, // Zod will coerce this to '1'
      data: {
        result: {
          prefectureCode: 13,
          prefectureName: '東京都',
          type: 1,
          years: [{ year: 2018, value: 100 }],
        },
      },
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstateTransactionJsonInfrastructure,
        { provide: PATH_TO_RESOURCE, useValue: 'dummy/path.json' },
        PrefectureService,
        YearService,
        TypeService,
      ],
    }).compile();

    infrastructure = module.get<EstateTransactionJsonInfrastructure>(
      EstateTransactionJsonInfrastructure,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryTransactionValue', () => {
    it('リクエストに一致するデータが見つかった場合に価格を返す', async () => {
      const request: EstateTransactionRequest = {
        year: 2018,
        prefectureCode: '13',
        type: '1',
      };
      mockedFs.readFile.mockResolvedValue(JSON.stringify(mockTransactionData));

      await expect(infrastructure.queryTransactionValue(request)).resolves.toBe(
        100,
      );
    });

    it('リクエストに一致するデータが見つからない場合にundefinedを返す', async () => {
      const request: EstateTransactionRequest = {
        year: 2017,
        prefectureCode: '14',
        type: '2',
      };
      mockedFs.readFile.mockResolvedValue(JSON.stringify(mockTransactionData));

      await expect(infrastructure.queryTransactionValue(request)).resolves.toBe(
        undefined,
      );
    });

    it('ファイル読み込みでエラーが発生した場合にエラーをrejectする', async () => {
      const request: EstateTransactionRequest = {
        year: 2018,
        prefectureCode: '13',
        type: '1',
      };
      const readError = new Error('File not found');
      mockedFs.readFile.mockRejectedValue(readError);

      await expect(
        infrastructure.queryTransactionValue(request),
      ).rejects.toThrow('不動産取引価格データの取得または検証に失敗しました');
    });

    it('JSONのパースに失敗した場合にエラーをrejectする', async () => {
      const request: EstateTransactionRequest = {
        year: 2018,
        prefectureCode: '13',
        type: '1',
      };
      mockedFs.readFile.mockResolvedValue('invalid json');

      await expect(
        infrastructure.queryTransactionValue(request),
      ).rejects.toThrow('不動産取引価格データの取得または検証に失敗しました');
    });

    it('JSONの構造が不正な場合にエラーをrejectする', async () => {
      const request: EstateTransactionRequest = {
        year: 2018,
        prefectureCode: '13',
        type: '1',
      };
      const invalidData = [{ year: 'this should be a number' }];
      mockedFs.readFile.mockResolvedValue(JSON.stringify(invalidData));

      await expect(
        infrastructure.queryTransactionValue(request),
      ).rejects.toThrow('不動産取引価格データの取得または検証に失敗しました');
    });
  });
});
