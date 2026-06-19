# Quality Gate

Imaging Agriculture

Version 1.0

---

# Purpose

品質を後付けしない。

品質を開発フローへ組み込む。

---

# Philosophy

「速度より品質」ではない。

「品質が速度を生む」。

回帰バグ・仕様逸脱・品質低下は
開発速度を最も奪う。

品質ゲートはブレーキではなく
加速のための仕組みである。

---

# Founder Rule

新機能追加前に必ず自問する。

```
この機能は
土地を見る楽しさを増やすか？

それとも複雑さを増やすだけか？
```

答えが「複雑さを増やすだけ」なら作らない。

---

# Feature Addition Checklist

新機能追加時は以下をすべて満たすこと。

```
□ PRODUCT_THESIS との整合確認
  → この機能は Vision / Mission に沿っているか

□ ROADMAP との整合確認
  → 現フェーズのスコープ内か

□ DATA_MODEL 更新確認
  → 新しいエンティティ・フィールドが必要なら更新済みか

□ MVP_SCREEN_SPEC 更新確認
  → 画面・UX の変更が仕様に反映済みか

□ Playwright テスト追加
  → 主要導線のテストが追加済みか

□ GitHub Actions 通過
  → lint / typecheck / build / playwright がすべて green か

□ Sentry 監視対象確認
  → 新しいエラー発生箇所が Sentry の対象になっているか

□ ADR 必要性確認
  → 技術・設計の重要な決定をした場合は ADR を作成したか
```

すべてのチェックが完了するまでマージしない。

---

# Pull Request Checklist

PR 作成時に以下を確認する。

```
必須

□ Screen Spec 更新済み（UI 変更がある場合）
□ Data Model 更新済み（DB 変更がある場合）
□ Playwright テスト追加済み
□ Playwright ローカルで成功確認済み
□ CI 成功（GitHub Actions green）
□ エラーケース確認済み
□ Sentry でエラーが新規発生していないことを確認
```

---

# Non Goals

以下は禁止。

```
「動くからマージする」   → 禁止
「後でテストを書く」     → 禁止
「急ぎだからCIを無視」   → 禁止
「小さい変更だからOK」   → 禁止
```

小さい変更ほど見落としやすい。

---

# Regression Protection

## 主要回帰テスト対象導線

以下は常に自動テストで保護する。

```
導線 1: 土地カード完了フロー
  Home → Question → Answer → Result → XP 反映

導線 2: プロフィール表示
  Profile 画面が正常に表示される

導線 3: エラー非発生
  上記導線でコンソールエラーが発生しない
```

この 3 導線が壊れた状態でのマージは禁止。

---

# Sentry Alert Rules

以下の条件でアラートを発火させる。

```
Unhandled Error       → 即時通知
Unhandled Rejection   → 即時通知
Render Error          → 即時通知
Network Error (5xx)   → 即時通知
Error Rate > 1%       → 即時通知
```

アラートを受けたら同日中に原因を特定する。

---

# ADR Trigger Conditions

以下の場合は ADR を作成する。

```
□ 技術スタックの選定・変更
□ データモデルの構造変更
□ 外部サービスの追加・変更
□ プロダクト方針の転換
□ 非目標リストへの追加・削除
□ テスト戦略の変更
```

軽微な実装変更には不要。

---

# Quality Review Cadence

## 毎 PR

GitHub Actions / Playwright / チェックリスト確認

## 週次

Sentry のエラーログ確認
テストカバレッジの確認

## フェーズ完了時

全テストの棚卸し
チェックリストの更新
ADR の整合性確認
