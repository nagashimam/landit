import { ValidationPipe } from './validation';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { EstateTransactionRequest } from './model/request';
import { Test, TestingModule } from '@nestjs/testing';
import { EstateTransactionModule } from './module';

describe('ValidationPipe', () => {
  let pipe: ValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EstateTransactionModule],
    }).compile();

    pipe = module.get<ValidationPipe>(ValidationPipe);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    const metadata: ArgumentMetadata = { type: 'query' };

    it('有効なリクエストが渡された場合、yearを数値に変換して値を返す', () => {
      const value: EstateTransactionRequest = {
        year: 2015,
        prefectureCode: '13',
        type: '1',
      };
      const expected = {
        year: 2015,
        prefectureCode: '13',
        type: '1',
      };
      expect(pipe.transform(value, metadata)).toEqual(expected);
    });

    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    it('yearが指定されていない場合、BadRequestExceptionをスローする', () => {
      const value = { prefectureCode: '13', type: '1' };
      expect(() => pipe.transform(value as any, metadata)).toThrow(
        new BadRequestException(
          'type、prefectureCode、yearの全てを指定してください',
        ),
      );
    });

    it('prefectureCodeが指定されていない場合、BadRequestExceptionをスローする', () => {
      const value = { year: 2015, type: '1' };
      expect(() => pipe.transform(value as any, metadata)).toThrow(
        new BadRequestException(
          'type、prefectureCode、yearの全てを指定してください',
        ),
      );
    });

    it('typeが指定されていない場合、BadRequestExceptionをスローする', () => {
      const value = { year: 2015, prefectureCode: '13' };
      expect(() => pipe.transform(value as any, metadata)).toThrow(
        new BadRequestException(
          'type、prefectureCode、yearの全てを指定してください',
        ),
      );
    });

    it('無効なyearが指定された場合、BadRequestExceptionをスローする', () => {
      const value = {
        year: 2014,
        prefectureCode: '13',
        type: '1',
      };
      expect(() => pipe.transform(value as any, metadata)).toThrow(
        new BadRequestException(
          'yearは2015、2016、2017、2018のどれかから選んでください',
        ),
      );
    });

    it('無効なprefectureCodeが指定された場合、BadRequestExceptionをスローする', () => {
      const value = {
        year: '2015',
        prefectureCode: '99',
        type: '1',
      };
      expect(() => pipe.transform(value as any, metadata)).toThrow(
        new BadRequestException(
          'prefectureCodeは8:(茨城県)、9:(栃木県)、10:(群馬県)、11:(埼玉県)、12:(千葉県)、13:(東京都)、14:(神奈川県)のどれかから選んでください',
        ),
      );
    });

    it('無効なtypeが指定された場合、BadRequestExceptionをスローする', () => {
      const value = {
        year: '2015',
        prefectureCode: '13',
        type: '3',
      };
      expect(() => pipe.transform(value as any, metadata)).toThrow(
        new BadRequestException(
          'typeは1(住宅地)もしくは2(商業地)を選んでください',
        ),
      );
    });
    /* eslint-enable @typescript-eslint/no-unsafe-argument */
  });
});
