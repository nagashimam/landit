import { Injectable } from '@nestjs/common';

// 1が住宅地、2が商業地
const validTypes = ['1', '2'] as const;
export type Type = (typeof validTypes)[number];
@Injectable()
export class TypeService {
  isValidType(str: string): str is Type {
    return !!validTypes.find((validType) => validType === str);
  }
  hasValidType(item: any): boolean {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    if (typeof item.type !== 'string') {
      return false;
    }
    return this.isValidType(item.type as string);
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  }
}
