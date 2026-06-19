# Governance

Imaging Agriculture

Version 1.0

---

# Purpose

このドキュメントは

「土地を読む力を育てるアプリ」

の開発・運営を迷いなく進めるための
意思決定基盤を定義する。

---

# Document Priority

意思決定が衝突したとき
下記の優先順位に従う。

```
1  PRODUCT_THESIS      なぜ作るか
2  NORTH_STAR          何を最大化するか
3  ROADMAP             いつ何をするか
4  CONTENT_STRATEGY    何を作るか
5  DATA_MODEL          どう記録するか
6  MVP_SCREEN_SPEC     どう見せるか
7  実装                 どう動かすか
```

コードは仕様に従う。

仕様が現実に合わなくなった場合は
コードではなく仕様を更新する。

---

# Decision Rules

## Rule 1 — North Star First

機能追加・削除・変更の判断は
Land Reading Sessions を増やすか
という一点で行う。

増やさないものは作らない。

---

## Rule 2 — Product Principles Over Convenience

以下は原則として守る。

* 知識を教えない。観察を促す
* 正解を持たない。推奨回答を持つ
* ゲームにする。学習アプリにしない
* ユーザーを農家にしない。土地好きにする

機能の実装前に
「この原則に反しないか」
を確認する。

---

## Rule 3 — MVP Scope Lock

MVP フェーズ中は
ROADMAP Phase 0 のスコープを守る。

スコープ外の機能は
Phase 1 以降のリストに追加する。

「あったら便利」は実装しない。

---

## Rule 4 — One Canonical Source

各トピックの正本は CANONICAL_SOURCE.md に定義する。

複数ドキュメントが矛盾した場合は
優先順位の高いドキュメントが正しい。

低いドキュメントを更新する。

---

## Rule 5 — Write It Down

口頭決定は存在しない。

決定したことは
ADR または該当ドキュメントに記録する。

記録されていない決定は
未決定として扱う。

---

# ADR (Architecture Decision Records)

## 運用方針

技術・設計・プロダクトの重要な決定を記録する。

軽微な変更には不要。

以下の場合に作成する。

* 技術スタックの選定・変更
* データモデルの構造変更
* プロダクト方針の転換
* 非目標リストへの追加

---

## ADR フォーマット

```
# ADR-[番号] [タイトル]

Date: YYYY-MM-DD
Status: Proposed / Accepted / Deprecated

## Context

なぜこの決定が必要か

## Decision

何を決めたか

## Consequences

何が変わるか。トレードオフは何か

## Alternatives Considered

検討したが採用しなかった選択肢
```

---

## ADR 保存場所

governance/adr/

例

governance/adr/ADR-001-tech-stack.md

---

# MVP Principles

## 原則1 — 最小で動かす

Phase 0 の成功条件は

* 30人以上が利用
* 回答完了率 70% 以上

この2つだけ達成すれば成功。

---

## 原則2 — 削る

迷ったら削る。

追加するより削る方が難しい。

---

## 原則3 — 計測してから判断

感覚で改善しない。

PostHog イベントを見てから判断する。

---

## 原則4 — コンテンツが先

機能より土地カードが先。

土地カード 10 枚より
土地カード 1 枚の方が価値がある。

---

# Non-Goals Management

## 非目標リスト（MVP）

以下は MVP フェーズでは作らない。

* SNS 機能
* コメント・フォロー・DM
* AI 画像認識
* AI 土地診断
* 農地売買
* ユーザー間比較・ランキング
* オフライン機能
* コミュニティ機能

---

## 非目標への対応

ユーザーや自分自身から
非目標機能の要望が出た場合

1. ROADMAP の該当フェーズに記録する
2. 現フェーズでは実装しないと明示する
3. 非目標リストを更新する

---

# Founder's Decision Log

重要な方針転換は以下に記録する。

```
Date: YYYY-MM-DD
Decision: [何を決めたか]
Reason: [なぜ決めたか]
Impact: [何が変わるか]
```

---

# Review Cadence

## Weekly

* FOUNDER_DASHBOARD.md の指標確認
* CUSTOMER_TRUTH_REPOSITORY.md への追記
* 非目標リストの確認

## Per Phase

* ROADMAP の進捗確認
* ADR の棚卸し
* 優先順位ドキュメントの整合性確認
