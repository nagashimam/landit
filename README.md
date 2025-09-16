# コーディング試験

コーディング試験用に作成したプロジェクトです

## 起動方法

### 1. 依存パッケージのインストール

`package-lock.json`に基づいて、依存関係をクリーンインストールします。

```bash
npm ci
```

### 2. アプリケーションの起動

下記コマンドを実行すると、`http://localhost:3000`でサーバーが起動します。

```bash
npm run start
```

## APIのテスト方法

サーバー起動後、以下のエンドポイントにGETリクエストを送信することで、不動産取引価格のデータを取得できます。

**エンドポイント:**
`GET http://localhost:3000/api/v1/townPlanning/estateTransaction/bar`

**クエリパラメータ:**

| 名前             | 説明                   | 例   |
| ---------------- | ---------------------- | ---- |
| `year`           | 年度 (2015-2018)       | 2018 |
| `prefectureCode` | 都道府県コード（関東） | 13   |
| `type`           | 1: 住宅地, 2: 商業地   | 1    |

**リクエスト例 (curl):**

```bash
curl "http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2018&prefectureCode=13&type=1"
```

**成功時のレスポンス例:**

```json
356100
```

## ユニットテスト・静的解析・フォーマッターの実行

プロジェクトに実装されているユニットテストは、以下のコマンドで実行できます。

```bash
npm run test
```

同様に静的解析は`npm run lint`、フォーマッターは`npm run format`で実行できます。
