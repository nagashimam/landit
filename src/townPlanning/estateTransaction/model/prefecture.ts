import { Injectable } from '@nestjs/common';

// 関東の都道府県のみが対象
// コードはRESASのWebページから確認できる
// https://opendata.resas-portal.go.jp/docs/api/v1/index.html
const kantoPrefectures = [
  { code: '8', name: '茨城県' },
  { code: '9', name: '栃木県' },
  { code: '10', name: '群馬県' },
  { code: '11', name: '埼玉県' },
  { code: '12', name: '千葉県' },
  { code: '13', name: '東京都' },
  { code: '14', name: '神奈川県' },
] as const;
export type Prefecture = (typeof kantoPrefectures)[number];
export type PrefectureCode = Prefecture['code'];
export type PrefectureName = Prefecture['name'];

@Injectable()
export class PrefectureService {
  isValidPrefectureCode(str: string): str is PrefectureCode {
    return !!kantoPrefectures.find((prefecture) => prefecture.code === str);
  }
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  isValidPrefecture(obj: any): obj is Prefecture {
    return !!kantoPrefectures.find((prefecture) => {
      if (typeof obj !== 'object') {
        return false;
      }
      if (typeof obj.code !== 'string') {
        return false;
      }

      if (typeof obj.name !== 'string') {
        return false;
      }

      return prefecture.code === obj.code && prefecture.name === obj.name;
    });
  }

  hasValidPrefecture(item: any): boolean {
    if (typeof item !== 'object') {
      return false;
    }
    if (typeof item.prefectureCode !== 'string') {
      return false;
    }
    if (typeof item.prefectureName !== 'string') {
      return false;
    }
    return this.isValidPrefecture({
      code: item.prefectureCode as string,
      name: item.prefectureName as string,
    });
  }

  hasValidPrefectureCode(item: any): boolean {
    if (typeof item !== 'object') {
      return false;
    }
    if (typeof item.prefectureCode !== 'string') {
      return false;
    }
    return this.isValidPrefectureCode(item.prefectureCode as string);
  }
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
}
