# Asset & Link Update Guide

サイト構成を変更せず、商品画像と外部リンクを簡単に更新するためのルールです。

## 商品画像
以下のパスへ画像を追加すると自動表示されます。

- `assets/images/products/line-stickers.jpg`
- `assets/images/products/tshirt.jpg`
- `assets/images/products/hoodie.jpg`
- `assets/images/products/mug.jpg`
- `assets/images/products/ecobag.jpg`
- `assets/images/products/line-stickers-feature.jpg`

画像が存在しない場合は商品名のプレースホルダーが表示されます。

## 外部リンク
`assets/js/site-data.js` の `links` にURLを設定します。

URLが空文字の場合のみ `Coming soon` を表示します。URLを設定するとクリック可能な外部リンクに自動で切り替わります。

対象: LINE STORE / UP-T / Instagram / X
