## これは何？

TDD をしつつ github copilot を有効活用するにはどのようにコードを書いていくべきなのかを模索する課題集です。
正解は私にもわからないので議論していきましょう。
課題をこなしていくにつれ、TDD そのものや copilot への理解が深まるようにしていきます。

## 事前準備

- github copilot を vscode で使えるようにセットアップ
- `yarn install`後に`yarn test`でテストが動作するかを確認

## 課題

- `Subscription`のリストを配列で返す API から必要な情報を抽出する関数を作ります
- API は開発途中のものを使っています
  - よきせぬ仕様変更が入る可能性があります
  - ドキュメントはあまり整理されていない状態で、実際に動く実物以外の情報はないものとします

### 課題 1

`subscriptionOfferDetails.offerTags`に`sub`を含む、`offerToken`を返す関数を作ってください。
ただし、`publishedAt`が現在時刻より前(発行済み)かつ、最も新しいオブジェクトに含まれる`subscriptionOfferDetails`以下のもののみを返してください。
サンプル API を叩くと以下のようなレスポンスが帰ってきます。

```json
[
  {
    "subscriptionOfferDetails": [
      {
        "pricingPhases": {
          "pricingPhaseList": [
            {
              "recurrenceMode": 2,
              "priceAmountMicros": "0",
              "billingCycleCount": 1,
              "billingPeriod": "P2W",
              "priceCurrencyCode": "JPY",
              "formattedPrice": "Free"
            },
            {
              "recurrenceMode": 1,
              "priceAmountMicros": "9700000000",
              "billingCycleCount": 0,
              "billingPeriod": "P1Y",
              "priceCurrencyCode": "JPY",
              "formattedPrice": "¥9,700"
            }
          ]
        },
        "offerTags": [],
        "offerToken": "sample-offer-token-hoge"
      },
      {
        "pricingPhases": {
          "pricingPhaseList": [
            {
              "recurrenceMode": 1,
              "priceAmountMicros": "9700000000",
              "billingCycleCount": 0,
              "billingPeriod": "P1Y",
              "priceCurrencyCode": "JPY",
              "formattedPrice": "¥9,700"
            }
          ]
        },
        "offerTags": [],
        "offerToken": "sample-offer-token-fuga"
      },
      {
        "pricingPhases": {
          "pricingPhaseList": [
            {
              "recurrenceMode": 1,
              "priceAmountMicros": "8000000000",
              "billingCycleCount": 0,
              "billingPeriod": "P1M",
              "priceCurrencyCode": "JPY",
              "formattedPrice": "¥8,000"
            }
          ]
        },
        "offerTags": ["main"],
        "offerToken": "sample-offer-token-piyo"
      }
    ],
    "name": "サンプルプラン",
    "productType": "main",
    "description": "",
    "title": "サンプルプラン (サンプルアプリ)",
    "productId": "sample_subscription_id_1",
    "publishedAt": "2021-01-01T00:00:00.000Z"
  }
]
```

### 課題 2

仕様変更です。絞り込む対象オブジェクトは`publishedAt`が最も新しいオブジェクトではなく、新たに追加された`pricingTags`に`pickup`が含まれるものに限定してください。
サンプル API を叩くと以下のようなレスポンスが帰ってきます。

```json
[
  {
    "subscriptionOfferDetails": [
      {
        "pricingPhases": {
          "pricingPhaseList": [
            {
              "recurrenceMode": 2,
              "priceAmountMicros": "0",
              "billingCycleCount": 1,
              "billingPeriod": "P2W",
              "priceCurrencyCode": "JPY",
              "formattedPrice": "Free",
              "pricingTags": []
            },
            {
              "recurrenceMode": 1,
              "priceAmountMicros": "9700000000",
              "billingCycleCount": 0,
              "billingPeriod": "P1Y",
              "priceCurrencyCode": "JPY",
              "formattedPrice": "¥9,700",
              "pricingTags": ["pickup"]
            }
          ]
        },
        "offerTags": [],
        "offerToken": "sample-offer-token-hoge"
      }
    ],
    "name": "サンプルプラン",
    "productType": "main",
    "description": "",
    "title": "サンプルプラン (サンプルアプリ)",
    "productId": "sample_subscription_id_1",
    "publishedAt": "2021-01-01T00:00:00.000Z"
  }
]
```
