import { Test, TestingModule } from '@nestjs/testing';
import { EstateTransactionController } from './controller';
import { EstateTransactionUsecase } from './usecase';
import { EstateTransactionRequest } from './model/request';
import { PrefectureService } from './model/prefecture';
import { TypeService } from './model/type';
import { YearService } from './model/year';
import { ValidationPipe } from './validation';

describe('EstateTransactionController', () => {
  let controller: EstateTransactionController;
  let usecase: EstateTransactionUsecase;

  const mockUsecase = {
    getEstateTransactionValue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstateTransactionController],
      providers: [
        ValidationPipe,
        PrefectureService,
        TypeService,
        YearService,
        {
          provide: EstateTransactionUsecase,
          useValue: mockUsecase,
        },
      ],
    }).compile();

    controller = module.get<EstateTransactionController>(
      EstateTransactionController,
    );
    usecase = module.get<EstateTransactionUsecase>(EstateTransactionUsecase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByQueryParameters', () => {
    it('should call usecase.getEstateTransactionValue with correct parameters', () => {
      const request: EstateTransactionRequest = {
        year: 2018,
        prefectureCode: '8',
        type: '1',
      };
      const expectedResult = { value: 100 };
      mockUsecase.getEstateTransactionValue.mockResolvedValue(expectedResult);

      const result = controller.findByQueryParameters(request);

      /* eslint-disable @typescript-eslint/unbound-method */
      /* eslint-disable @typescript-eslint/no-floating-promises */
      expect(usecase.getEstateTransactionValue).toHaveBeenCalledWith(request);
      expect(result).resolves.toBe(expectedResult);
      /* eslint-enable @typescript-eslint/unbound-method */
      /* eslint-enable @typescript-eslint/no-floating-promises */
    });
  });
});
