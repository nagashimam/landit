import { Injectable } from '@nestjs/common';

const validYears = [2015, 2016, 2017, 2018] as const;
export type Year = (typeof validYears)[number];

@Injectable()
export class YearService {
  isValidYear(num: number): num is Year {
    return !!validYears.find((year) => num === year);
  }
  hasValidYear(item: any): boolean {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    if (typeof item.year !== 'number') {
      return false;
    }
    return this.isValidYear(item.year as number);
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  }
}
