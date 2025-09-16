import { Test, TestingModule } from '@nestjs/testing';
import { PrefectureService } from './prefecture';

describe('PrefectureService', () => {
  let service: PrefectureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrefectureService],
    }).compile();

    service = module.get<PrefectureService>(PrefectureService);
  });

  it('正しい都道府県コードか判定できる', () => {
    // 福島県
    expect(service.isValidPrefectureCode('7')).toBeFalsy();
    // 茨城県
    expect(service.isValidPrefectureCode('8')).toBeTruthy();
    // 栃木県
    expect(service.isValidPrefectureCode('9')).toBeTruthy();
    // 群馬県
    expect(service.isValidPrefectureCode('10')).toBeTruthy();
    // 埼玉県
    expect(service.isValidPrefectureCode('11')).toBeTruthy();
    // 千葉県
    expect(service.isValidPrefectureCode('12')).toBeTruthy();
    // 東京都
    expect(service.isValidPrefectureCode('13')).toBeTruthy();
    // 神奈川県
    expect(service.isValidPrefectureCode('14')).toBeTruthy();
    // 新潟県
    expect(service.isValidPrefectureCode('15')).toBeFalsy();
  });
});
