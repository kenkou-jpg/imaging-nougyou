# Release Gate

Imaging Agriculture

Version 1.0

---

# Philosophy

「動くからリリースする」は禁止。

「壊れていないことを確認してからリリースする」。

品質ゲートはリリースのブレーキではなく
ユーザーへの約束である。

---

# 新機能追加条件

新機能をマージする前に以下をすべて満たすこと。

---

## 仕様整合チェック

```
□ PRODUCT_THESIS との整合確認
  → この機能は Vision / Mission に沿っているか
  → 「土地を見る楽しさを増やすか」の問いに YES か
  → NO / 迷う場合は実装しない

□ ROADMAP との整合確認
  → 現フェーズ（Phase 0 = MVP）のスコープ内か
  → スコープ外なら ROADMAP に TODO として追記するだけ

□ MVP_SCREEN_SPEC 更新確認
  → 画面・UX の変更が仕様書に反映済みか
  → 仕様を変えた場合は SCREEN_SPEC を先に更新する
```

---

## データ整合チェック

```
□ DATA_MODEL 更新確認
  → 新しいテーブル・フィールドが必要な場合は更新済みか
  → recommended_answer であり correct_answer ではないか
  → DB 変更は必ず DATA_MODEL.md に先に反映する

□ Supabase マイグレーション確認
  → ローカルで migration を実行して動作確認済みか
  → 既存データへの影響がないか確認済みか
```

---

## コード品質チェック

```
□ GitHub Actions（quality job）成功
  → lint: エラーゼロ
  → typecheck: エラーゼロ
  → build: 成功

□ GitHub Actions（playwright job）成功
  → P1: Land Card Flow テスト通過
  → P2: Profile Flow テスト通過
  → P3: XP Flow テスト通過
  → コンソールエラーなし
```

---

## 監視チェック

```
□ Sentry 監視対象確認
  → 新しいエラー発生箇所が Sentry の対象になっているか
  → try/catch が適切に実装されているか
  → Sentry.captureException が必要な箇所に入っているか

□ PostHog イベント確認
  → 新機能に関連するイベントが POSTHOG_EVENTS.md に定義されているか
  → イベントの発火が実装されているか
  → Preview 環境でイベントが届いているか確認済みか
```

---

## ドキュメントチェック

```
□ ADR 必要性確認
  → 技術スタックの選定・変更がある場合は ADR を作成
  → データモデルの構造変更がある場合は ADR を作成
  → 外部サービスの追加がある場合は ADR を作成
  → 「なんとなく決めた」を記録に残す

□ CANONICAL_SOURCE.md 更新確認
  → 新しいドキュメントが必要な場合は追記
```

---

# 本番反映条件

マージ後に本番へ自動デプロイされる。
以下を確認してからマージする。

```
□ 上記「新機能追加条件」をすべて満たしている
□ Vercel Preview URL で Founder が目視確認済み
□ 実機（iPhone）で主要導線を操作確認済み
□ 「正解/不正解」の文言がないことを確認済み
□ 土地写真が主役になっていることを確認済み
```

---

# Smoke Test（本番反映後）

本番デプロイ完了後に必ず実施する。

```
所要時間: 30秒〜1分

確認項目:
□ ホーム画面が表示される
□ 土地カードが表示される（写真が出る）
□ 選択肢をタップできる
□ 回答して Result 画面に遷移する
□ XP が加算される
□ Sentry にエラーが出ていない
```

Smoke Test 失敗 → 即ロールバック（Vercel Instant Rollback）

---

# 緊急修正ルール（Hotfix）

本番でバグが発生した場合の特別ルール。

---

## 緊急修正の定義

以下のいずれかに該当する場合。

```
・ユーザーが主要導線を完了できない
・データが壊れている（回答が保存されない等）
・Sentry でエラー率 > 5%
・Founder が「これは今すぐ直す必要がある」と判断した場合
```

---

## 緊急修正フロー

```
1. hotfix/* ブランチを main から切る
   git checkout -b hotfix/[問題名] main

2. 最小限の修正のみ実施
   「ついでに」の改善は禁止

3. GitHub Actions を通す（緊急でも省略しない）
   lint / typecheck / build / playwright は必須

4. main に直接マージ
   通常の feature/* → develop → main フローは省略可

5. 本番デプロイ後に Smoke Test

6. 事後に原因・対策を記録
   research/CUSTOMER_TRUTH_REPOSITORY.md に事象を記録
   governance/adr/ に再発防止策を ADR として記録（重大な場合）
```

---

## 緊急でも省略してはいけないもの

```
✗ GitHub Actions（lint/typecheck/build）の省略
✗ Playwright テストの省略
✗ Smoke Test の省略
✗ 修正内容の記録（コミットメッセージ）
```

---

## 緊急修正後の必須アクション

```
□ Sentry でエラーが解消されたことを確認
□ PostHog で North Star 指標が回復していることを確認
□ 再発防止策を検討して記録する
□ 必要であれば Playwright テストを追加する
```

---

# リリース判定フローチャート

```
新機能を作った
      ↓
PRODUCT_THESIS との整合確認
      ↓
整合している？
  YES → 続ける
  NO  → 実装しない / ROADMAP に TODO 追記
      ↓
DATA_MODEL / SCREEN_SPEC を先に更新
      ↓
実装
      ↓
ローカルで Playwright を実行
      ↓
全テスト通過？
  YES → PR 作成
  NO  → 修正してから PR
      ↓
GitHub Actions（quality + playwright）
      ↓
全て green？
  YES → 続ける
  NO  → 修正
      ↓
Vercel Preview で目視確認
      ↓
UX/仕様に問題ない？
  YES → Merge
  NO  → 修正
      ↓
本番デプロイ
      ↓
Smoke Test
      ↓
問題ない？
  YES → 完了
  NO  → Instant Rollback → 原因調査
```

---

# Non Goals（Release Gate に含めないもの）

```
・ユニットテストのカバレッジ率目標（MVP では E2E 優先）
・コードレビューの必須化（Founder 1人のため）
・ステージング環境の必須化（MVP フェーズは省略可）
・リリースノートの作成（ユーザーが少ない間は不要）
```
