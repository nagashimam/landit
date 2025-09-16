import { Module } from '@nestjs/common';

import { PrefectureService } from './model/prefecture';
import { TypeService } from './model/type';
import { YearService } from './model/year';
import { EstateTransactionController } from './controller';
import { EstateTransactionUsecase } from './usecase';
import { ESTATE_TRANSACTION_REPOSITORY } from './repository';
import { EstateTransactionJsonInfrastructure } from './json-infrastructure';
import { ValidationPipe } from './validation';

import { PATH_TO_RESOURCE } from './constants';

@Module({
  controllers: [EstateTransactionController],
  providers: [
    ValidationPipe,
    PrefectureService,
    TypeService,
    YearService,
    EstateTransactionUsecase,
    {
      provide: ESTATE_TRANSACTION_REPOSITORY,
      useClass: EstateTransactionJsonInfrastructure,
    },
    {
      provide: PATH_TO_RESOURCE,
      useValue: 'src/assets/estate_transactions.json',
    },
  ],
})
export class EstateTransactionModule {}
