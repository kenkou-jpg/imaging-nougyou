# Imaging Agriculture

土地を読む力を育てる。

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Documents

| ドキュメント | 責務 |
|------------|------|
| [PRODUCT_THESIS](docs/PRODUCT_THESIS.md) | なぜ作るか |
| [NORTH_STAR](docs/NORTH_STAR.md) | 成功の定義 |
| [ROADMAP](docs/ROADMAP.md) | フェーズ管理 |
| [CONTENT_STRATEGY](docs/CONTENT_STRATEGY.md) | コンテンツ方針 |
| [DATA_MODEL](docs/DATA_MODEL.md) | DB 設計 |
| [MVP_SCREEN_SPEC](docs/MVP_SCREEN_SPEC.md) | 画面仕様 |
| [QUALITY_GATE](docs/QUALITY_GATE.md) | 品質基準 |
| [GOVERNANCE](governance/GOVERNANCE.md) | 意思決定ルール |
| [CANONICAL_SOURCE](source/CANONICAL_SOURCE.md) | ドキュメント責務一覧 |

---

## Tech Stack

- **Frontend**: Next.js + TypeScript + Tailwind + shadcn/ui
- **Backend**: Supabase
- **Analytics**: PostHog
- **Error Monitoring**: Sentry
- **Testing**: Playwright
- **CI**: GitHub Actions

---

## Development

### テスト実行

```bash
# E2E テスト（ローカル）
npx playwright test

# 特定ファイルのみ
npx playwright test playwright/tests/land-card-flow.spec.ts

# UI モードで確認
npx playwright test --ui
```

### CI

PR 作成時に自動で以下を実行する。

```
lint → typecheck → build → playwright
```

すべて green にならないとマージできない。

---

## Error Monitoring (Sentry)

### 設定

環境変数に以下を設定する。

```
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
NEXT_PUBLIC_SENTRY_DSN=
```

### 監視対象

- Unhandled Errors
- Unhandled Promise Rejections
- Network Errors (5xx)
- React Render Errors

### 運用ルール

- 本番エラーは発生当日中に原因を特定する
- Sentry のアラートは Slack / メールで即時通知する（要設定）
- エラーを確認したら Sentry 上で Assigned / Resolved を更新する
- 同じエラーが 3 回以上発生したら ADR を作成して根本対応する

### ローカルでの Sentry 無効化

```bash
SENTRY_DSN=  # 空にすることで無効化
```

---

## Quality Gate

新機能追加前に [QUALITY_GATE.md](docs/QUALITY_GATE.md) のチェックリストを確認すること。

```
□ PRODUCT_THESIS との整合確認
□ ROADMAP との整合確認
□ DATA_MODEL 更新確認
□ MVP_SCREEN_SPEC 更新確認
□ Playwright テスト追加
□ GitHub Actions 通過
□ Sentry 監視対象確認
□ ADR 必要性確認
```

---

## ADR

設計・技術の重要な決定は [governance/adr/](governance/adr/) に記録する。

- [ADR-001](governance/adr/ADR-001-quality-first-development.md) — Quality First Development
