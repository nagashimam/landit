import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { PrefectureService } from './model/prefecture';
import { EstateTransactionRequest } from './model/request';
import { TypeService } from './model/type';
import { YearService } from './model/year';

@Injectable()
export class ValidationPipe implements PipeTransform<EstateTransactionRequest> {
  @Inject(YearService)
  private yearService: YearService;
  @Inject(PrefectureService)
  private prefectureService: PrefectureService;
  @Inject(TypeService)
  private typeService: TypeService;

  transform(value: EstateTransactionRequest, _metadata: ArgumentMetadata) {
    const { year, prefectureCode, type } = value;
    if (!(year && prefectureCode && type)) {
      throw new BadRequestException(
        'type、prefectureCode、yearの全てを指定してください',
      );
    }

    const unvalidatedYear = Number(year);
    if (this.yearService.isValidYear(unvalidatedYear)) {
      // @Queryで受け取ると文字列になっているので、numberで上書き
      value.year = unvalidatedYear;
    } else {
      throw new BadRequestException(
        'yearは2015、2016、2017、2018のどれかから選んでください',
      );
    }

    if (!this.prefectureService.isValidPrefectureCode(prefectureCode)) {
      throw new BadRequestException(
        'prefectureCodeは8:(茨城県)、9:(栃木県)、10:(群馬県)、11:(埼玉県)、12:(千葉県)、13:(東京都)、14:(神奈川県)のどれかから選んでください',
      );
    }

    if (!this.typeService.isValidType(type)) {
      throw new BadRequestException(
        'typeは1(住宅地)もしくは2(商業地)を選んでください',
      );
    }

    return value;
  }
}
