# Canonical Source

Imaging Agriculture

Version 1.0

---

# Purpose

各トピックの正本ドキュメントを定義する。

複数のドキュメントが同じトピックを扱う場合
ここに定義された正本が優先される。

---

# Document Registry

## PRODUCT_THESIS

責務

なぜこのプロダクトを作るか

正本となる問い

* Why
* Vision
* Mission
* Product Category
* Competitive Advantage
* Long-Term Vision

変更権限

Founder のみ

変更頻度

低（方向転換時のみ）

場所

docs/PRODUCT_THESIS.md

---

## NORTH_STAR

責務

成功の定義

正本となる問い

* North Star Metric の定義
* 追う指標と追わない指標
* 成功条件

変更権限

Founder のみ

変更頻度

低（フェーズ転換時のみ）

場所

docs/NORTH_STAR.md

---

## ROADMAP

責務

フェーズ管理

正本となる問い

* 何をいつ作るか
* フェーズの成功条件
* スコープの IN / OUT

変更権限

Founder

変更頻度

中（フェーズ完了・方針変更時）

場所

docs/ROADMAP.md

---

## PRODUCT_PRINCIPLES

責務

判断基準

正本となる問い

* 機能・コンテンツ・デザインの判断軸
* 「これはやらない」の根拠

変更権限

Founder のみ

変更頻度

低

場所

docs/PRODUCT_PRINCIPLES.md

---

## CONTENT_STRATEGY

責務

コンテンツ正本

正本となる問い

* 何を・どの順番で・何枚作るか
* コンテンツの品質基準
* Golden Rule

変更権限

Founder / コンテンツ担当

変更頻度

中

場所

docs/CONTENT_STRATEGY.md

---

## DATA_MODEL

責務

DB 正本

正本となる問い

* テーブル定義
* フィールド定義
* フェーズごとの実装範囲

変更権限

Founder / 開発担当

変更頻度

中（フェーズ追加時）

場所

docs/DATA_MODEL.md

---

## MVP_SCREEN_SPEC

責務

UI 正本

正本となる問い

* 画面構成
* 各画面の目的・コンポーネント
* UX ルール

変更権限

Founder / デザイン担当

変更頻度

高（MVP 検証中）

場所

docs/MVP_SCREEN_SPEC.md

---

## ARCHITECTURE

責務

技術構成正本

正本となる問い

* 技術スタック
* システム構成
* Non Goals（技術）

変更権限

Founder / 開発担当

変更頻度

低（スタック変更時のみ）

場所

docs/ARCHITECTURE.md

---

## GOVERNANCE

責務

意思決定ルール正本

正本となる問い

* ドキュメント優先順位
* 意思決定フロー
* ADR 運用
* MVP 原則

変更権限

Founder のみ

変更頻度

低

場所

governance/GOVERNANCE.md

---

## POSTHOG_EVENTS

責務

計測設計正本

正本となる問い

* 計測するイベント一覧
* イベントの発火条件・Properties
* 各指標との紐付け

変更権限

Founder / 開発担当

変更頻度

中（機能追加時）

場所

analytics/POSTHOG_EVENTS.md

---

## FOUNDER_DASHBOARD

責務

指標定義正本

正本となる問い

* 各指標の定義
* 目標値
* 確認頻度

変更権限

Founder のみ

変更頻度

低

場所

analytics/FOUNDER_DASHBOARD.md

---

## CUSTOMER_TRUTH_REPOSITORY

責務

ユーザー観察正本

正本となる問い

* ユーザーが実際に言ったこと
* そこから得たインサイト
* インサイトが転換した意思決定

変更権限

全員（追記）/ Founder（削除）

変更頻度

高（ユーザー接触のたびに）

場所

research/CUSTOMER_TRUTH_REPOSITORY.md

---

# Conflict Resolution

ドキュメント間で矛盾が生じた場合

1. GOVERNANCE.md の Document Priority に従う
2. 優先順位の低いドキュメントを更新する
3. 必要に応じて ADR を作成する

口頭決定でドキュメントを上書きしない。
