# バックエンド　スキルチェック

### ■ 課題

#### 不動産取引価格を検索するAPI

### ■ 要件

不動産取引価格を検索するAPI

### ■ 非機能要件

[添付のJSONファイル](/13b6e565ac0a80d494a5cdfd6e4c7f10?pvs=25#81c1589455f2422095b55281daf0db29)のデータをインポートいただき、不動産取引価格を返すAPIを作成してください

- Nestjsを利用すること
- リンターやフォーマッターを設定すること
- Postmanで正しくAPIコールできること
- Githubでバージョン管理すること
- Controller > UseCase > Repository > Infrastructureの構造で作成すること（Better）
- Controllerで呼び出す関数は、UseCaseの関数を呼び出すこと
- UseCaseでは、ユースケース単位でファイルを分けること
- UseCaseでは、Repositoryを返してInfrastructureで実装されている永続化されているもの（今回の場合、RESAS-API）を呼び出すこと
- Repositoryは、InterfaceでありDIを利用して実装はInfrastructureを参照すること

### ■ JSONデータファイル

estate_transactions.json

23.6KB

※ assets直下などに配置して参照してください

| Key            | Description              |
| -------------- | ------------------------ |
| year           | 年度 ※ 2015年から2018年  |
| prefectureCode | 都道府県（関東のみ）     |
| type           | 1：住宅地 2：商業地      |
| value          | 不動産取引価格 (円 / ㎡) |

### ■ API仕様

#### エンドポイント

GET: http://localhost:3000/api/v1/townPlanning/estateTransaction/bar

#### クエリパラメーター

例）

GET: http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?prefCode=13&cityCode=13101&displayType=1

| Name           | Description                   | Validation                     | Required |
| -------------- | ----------------------------- | ------------------------------ | -------- |
| year           | 年度 指定可能年度:2009-2021年 | 2015年から2018年の値であること | True     |
| prefectureCode | 都道府県（関東のみ）          | 関東のみのコードであること     | True     |
| type           | 1：住宅地 2：商業地           | 1 ~ 2の値であること            | True     |

### ■ 評価ポイント

#### Must

- API設計書通りに作成されていること
- 添付のJSONファイルを利用して、不動産取引価格を返すAPIを作成されていること
- クエリパラメータのバリデーションを満たしていること
- 適切な単位でディレクトリ・ファイル分けされていること
- Controllerにビジネスロジックを記載していないこと

#### Better

- ユニットテストがあること
  - Controller
  - UseCase
- Controller > UseCase > Repository > Infrastructureの構造
  - 難しい場合、Controller > Service > Repository構造でも良い

### ■ 提出物

GithubのリポジトリURL
