import { PrefectureCode } from './prefecture';
import { Type } from './type';
import { Year } from './year';

export interface EstateTransactionRequest {
  type: Type;
  prefectureCode: PrefectureCode;
  year: Year;
}
