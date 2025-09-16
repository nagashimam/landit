import { Controller, Get, Query } from '@nestjs/common';
import { EstateTransactionUsecase } from './usecase';
import type { EstateTransactionRequest } from './model/request';
import { ValidationPipe } from './validation';

@Controller({
  path: 'estateTransaction/bar',
  version: '1',
})
export class EstateTransactionController {
  constructor(private readonly usecase: EstateTransactionUsecase) {}

  @Get()
  findByQueryParameters(
    @Query(ValidationPipe)
    request: EstateTransactionRequest,
  ) {
    return this.usecase.getEstateTransactionValue(request);
  }
}
