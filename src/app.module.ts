import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { EstateTransactionModule } from './townPlanning/estateTransaction/module';

@Module({
  imports: [
    EstateTransactionModule,
    RouterModule.register([
      {
        path: 'townPlanning',
        module: EstateTransactionModule,
      },
    ]),
  ],
})
export class AppModule {}
