import { Test, TestingModule } from '@nestjs/testing';
import { TypeService } from './type';

describe('TypeService', () => {
  let service: TypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeService],
    }).compile();

    service = module.get<TypeService>(TypeService);
  });

  it('正しい地域区分が判定できる', () => {
    expect(service.isValidType('0')).toBeFalsy();
    // 住宅地
    expect(service.isValidType('1')).toBeTruthy();
    // 商業地
    expect(service.isValidType('2')).toBeTruthy();
    expect(service.isValidType('3')).toBeFalsy();
  });
});
