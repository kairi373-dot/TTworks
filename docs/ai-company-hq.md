# TTworks AI Company HQ

## Purpose
AI社員12名の固定ID、役職、配置、稼働状態をWeb/自動化処理で共通管理するための基準。

## 指揮系統
担当AI → AI-02 海里（AI COO / 経営参謀）→ CEO Teppei

## 稼働状態
idle / working / reporting / approval_wait / blocked / alert / completed

## CEO承認が必須
金銭支出、契約、商品公開、価格変更、外部への正式送信。

## 実装
- `assets/data/ai-employees.json`: 社員マスターと常駐ゾーン
- `assets/js/ai-company.js`: 状態遷移とUI連携用イベント
- 実処理は `ttworks:ai-status` イベントに接続して可視化する

## 次段階
キャラクター画像アセットを個別ファイル化した後、社員IDへ紐付け、オフィス画面上の座標・歩行/作業/報告アニメーションを追加する。
