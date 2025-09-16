import { Test, TestingModule } from '@nestjs/testing';
import { YearService } from './year';

describe('YearService', () => {
  let service: YearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YearService],
    }).compile();

    service = module.get<YearService>(YearService);
  });

  it('正しい検索年度を判定できる', () => {
    expect(service.isValidYear(2014)).toBeFalsy();
    expect(service.isValidYear(2015)).toBeTruthy();
    expect(service.isValidYear(2016)).toBeTruthy();
    expect(service.isValidYear(2017)).toBeTruthy();
    expect(service.isValidYear(2018)).toBeTruthy();
    expect(service.isValidYear(2019)).toBeFalsy();
  });
});
