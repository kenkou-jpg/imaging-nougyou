# CI/CD Architecture

Imaging Agriculture

Version 1.0

---

# Philosophy

Founder 1人で回せる自動化。

過剰なパイプラインは維持コストになる。
最小限の自動化で最大限の安心を得る。

---

# Overview

```
[Claude Code]
     ↓ feature/* ブランチで開発
[GitHub]
     ↓ PR 作成
[GitHub Actions — quality job]
     lint / typecheck / build
     ↓ 成功
[GitHub Actions — playwright job]
     E2E テスト（Chromium + iPhone14）
     ↓ 成功
[Vercel Preview Deploy]
     PR ごとに自動プレビュー URL 生成
     ↓ Founder が目視確認
[Merge to main]
     ↓
[Vercel Production Deploy]
     自動本番デプロイ
     ↓
[Smoke Test]
     本番環境で主要導線を自動確認
     ↓
[Sentry + PostHog Monitoring]
     エラー・指標の継続監視
```

---

# ツール構成

| ツール | 役割 | フェーズ |
|-------|------|---------|
| GitHub | ソース管理 / PR / レビュー | MVP〜 |
| GitHub Actions | CI 自動化（lint/test/build） | MVP〜 |
| Playwright | E2E テスト | MVP〜 |
| Vercel | Preview / Production デプロイ | MVP〜 |
| Supabase | DB / Auth / Storage | MVP〜 |
| Sentry | エラー監視 | MVP〜 |
| PostHog | プロダクト分析 | MVP〜 |
| Claude Code | 開発支援 | MVP〜 |

---

# 各工程の定義

## 1. 開発（feature/* ブランチ）

```
目的:
  機能開発を main から分離し、影響を局所化する

責務:
  □ feature/[機能名] でブランチを切る
  □ ローカルで lint / typecheck / playwright を通してからPR
  □ QUALITY_GATE.md のチェックリストを自己確認

失敗時対応:
  ローカルで修正してから PR を出す
  ローカルでテストが通らない状態でのPR禁止
```

---

## 2. PR（Pull Request）

```
目的:
  変更を記録し、自動検証のトリガーにする

責務:
  □ PR タイトルは変更内容を端的に表す
  □ PR 説明に QUALITY_GATE.md の7点チェックリストを記載
  □ GitHub Actions が自動でトリガーされる

失敗時対応:
  Actions が失敗した PR はマージ禁止
  マージ保護ルールで強制（BRANCH_STRATEGY.md 参照）
```

---

## 3. GitHub Actions — quality job

```
目的:
  コードの静的品質を自動で保証する

責務:
  □ npm ci でクリーンインストール
  □ npm run lint（ESLint）
  □ npm run typecheck（tsc --noEmit）
  □ npm run build（本番ビルドが通るか確認）

失敗時対応:
  エラーログを確認 → feature/* で修正 → push で再実行
  lint エラーは無視しない（--max-warnings 0 推奨）
  build エラーは必ず同日中に修正

所要時間目安: 2〜3分
```

---

## 4. GitHub Actions — playwright job

```
目的:
  主要ユーザー導線を自動で保証する

責務:
  □ quality job 成功後にのみ実行（needs: quality）
  □ Chromium + iPhone 14 の2環境でテスト
  □ P1: Land Card Flow（最優先）
  □ P2: Profile Flow
  □ P3: XP Flow
  □ テスト失敗時は playwright-report を artifact として保存

失敗時対応:
  playwright-report をダウンロードしてスクリーンショット確認
  テスト失敗 = 本番で壊れているのと同義
  必ず修正してからマージ

所要時間目安: 3〜5分
```

---

## 5. Vercel Preview Deploy

```
目的:
  実際のブラウザで変更を目視確認できる環境を提供する

責務:
  □ PR ごとに固有の Preview URL を自動生成
  □ Supabase の staging 環境（または本番と同じ）に接続
  □ Founder が実機（iPhone）で操作確認

失敗時対応:
  Vercel のビルドログを確認
  環境変数の設定漏れが最多原因 → Vercel ダッシュボードで確認

注意:
  MVP フェーズは staging DB を分けない（本番と同一 Supabase を使用）
  ユーザーが増えたら分離を検討（ADR で記録）
```

---

## 6. Founder Review

```
目的:
  自動では検出できない UX・仕様逸脱を人間が確認する

責務:
  □ Preview URL で実際に操作する
  □ BRAND_GUIDELINES.md の禁止ワードがないか確認
  □ 「正解/不正解」の表現が出ていないか確認
  □ 土地写真が主役になっているか確認

所要時間目安: 5〜10分

失敗時対応:
  feature/* ブランチに戻って修正
  UX品質に関するコメントをPRに残す
```

---

## 7. Merge to main

```
目的:
  品質が保証された変更を本番に反映する

条件:
  □ GitHub Actions（quality + playwright）が green
  □ Founder が Preview で目視確認済み
  □ QUALITY_GATE.md のチェックリスト完了

方法:
  Squash merge（コミット履歴をクリーンに保つ）
```

---

## 8. Vercel Production Deploy

```
目的:
  main へのマージを自動で本番に反映する

責務:
  □ main push をトリガーに自動デプロイ
  □ デプロイ完了後に Vercel から通知

所要時間目安: 1〜3分

失敗時対応:
  Vercel ダッシュボードでビルドログ確認
  即座にロールバック（Vercel の Instant Rollback を使用）
```

---

## 9. Smoke Test（本番確認）

```
目的:
  本番デプロイ後に主要導線が動くことを確認する

MVP フェーズ:
  Founder が手動で30秒の動作確認
  □ ホーム画面が表示されるか
  □ 土地カードが表示されるか
  □ 回答して結果画面に遷移するか

将来（ユーザー100人〜）:
  scripts/smoke-test.sh で自動化
  デプロイ後に自動実行

失敗時対応:
  Vercel の Instant Rollback で即時戻し
  Sentry でエラー原因を確認
```

---

## 10. Monitoring

```
目的:
  本番環境の健全性を継続的に把握する

Sentry:
  □ Unhandled Error → 即時通知（同日対応）
  □ Error Rate > 1% → 即時通知
  □ 週次でエラーログ確認

PostHog:
  □ Land Reading Sessions（North Star）を毎日確認
  □ Answer Completion Rate を毎日確認
  □ D1 / D7 Retention を週次確認
  □ 異常な指標低下は機能変更の影響を確認

確認先: analytics/FOUNDER_DASHBOARD.md
```

---

# Secrets 管理

| Secret 名 | 用途 | 設定場所 |
|-----------|------|---------|
| NEXT_PUBLIC_SUPABASE_URL | DB 接続 URL | GitHub Secrets / Vercel |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | DB 匿名アクセスキー | GitHub Secrets / Vercel |
| SUPABASE_SERVICE_ROLE_KEY | DB 管理操作（seed等） | GitHub Secrets のみ |
| VERCEL_TOKEN | Vercel API トークン | GitHub Secrets |
| VERCEL_PROJECT_ID | Vercel プロジェクト識別子 | GitHub Secrets |
| VERCEL_ORG_ID | Vercel 組織識別子 | GitHub Secrets |
| SENTRY_AUTH_TOKEN | Sentry ソースマップ送信 | GitHub Secrets / Vercel |
| NEXT_PUBLIC_POSTHOG_KEY | PostHog イベント送信 | GitHub Secrets / Vercel |
| NEXT_PUBLIC_POSTHOG_HOST | PostHog ホスト URL | GitHub Secrets / Vercel |

---

# パイプライン全体の所要時間

```
quality job:     2〜3分
playwright job:  3〜5分
Preview deploy:  1〜2分
Founder review:  5〜10分
Production deploy: 1〜3分
Smoke test:      1〜2分（手動）
─────────────────────────
合計:            約15〜25分 / PR
```

Founder 1人の開発では1日1〜2 PR が現実的。

---

# Future Infrastructure

Phase ごとに追加を検討する。

```
Phase 0（MVP）:
  ✅ GitHub Actions（quality + playwright）
  ✅ Vercel Preview / Production
  ✅ Sentry 基本監視
  ✅ PostHog 基本計測

Phase 1（MAU 100人〜）:
  □ scripts/smoke-test.sh の自動化
  □ Playwright を Preview Deploy 後にも自動実行
  □ Supabase staging 環境の分離
  □ Feature Flags（LaunchDarkly or Vercel Flags）

Phase 2（MAU 500人〜）:
  □ Supabase Backup の自動化確認
  □ Sentry Performance Monitoring 有効化
  □ PostHog Session Recording 有効化
  □ Uptime 監視（Better Uptime 等）

Phase 3（MAU 1000人〜）:
  □ develop ブランチの正式導入（BRANCH_STRATEGY.md 参照）
  □ CDN / 画像最適化の強化
  □ DB Migration の自動化（Supabase Migrations）
```
