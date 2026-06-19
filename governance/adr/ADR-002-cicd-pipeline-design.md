# ADR-002: CI/CD パイプライン設計

Date: 2026-06-19

Status: Accepted

---

## Context

Founder 1人で開発するにあたり、以下の問題を防ぐ必要がある。

- バグ混入（テストなしのマージ）
- デプロイ事故（本番への直接 push）
- 仕様逸脱（コードが一人歩きする）
- 開発速度の低下（過剰な CI でフィードバックが遅くなる）

AgriPath（前プロダクト）での教訓: テスト不足・品質管理不足が開発速度を最終的に奪った。

---

## Decision

### ブランチ戦略

`main` + `feature/*` + `hotfix/*` の3種類のみ。

`develop` ブランチは MVP フェーズでは導入しない。
理由: Founder 1人の開発では develop を介する価値より維持コストが高い。

### CI パイプライン

GitHub Actions で2ジョブ構成。

```
job 1: quality（lint / typecheck / build）
job 2: playwright（needs: quality）
```

E2E テスト（Playwright）をユニットテストより優先する。
理由: MVP 期はスペックが頻繁に変わる。ユニットテストのメンテコストが E2E より高くなる。

### デプロイ

Vercel の自動デプロイを活用する。

- PR → Preview Deploy（自動）
- main merge → Production Deploy（自動）

手動デプロイは禁止。デプロイはすべて GitHub 経由。

### Smoke Test

MVP フェーズ（〜MAU 100人）は Founder が手動で30秒確認。
`scripts/smoke-test.js` は Phase 1 以降で自動化する。

---

## Consequences

### メリット

- PR ごとに品質が保証される（テストなしでマージ不可）
- デプロイ事故が構造的に防止される
- Founder の確認コストが最小化される（Preview URL で5〜10分）

### デメリット

- PR あたり約10〜15分の CI 時間が発生する
- Playwright テストのメンテが必要（コードと同期）

### トレードオフ

CI 時間（10〜15分）は品質への投資。
MVP で品質を後回しにすると、ユーザーが増えた後のバグ修正コストが数倍になる。

---

## Rejected Alternatives

### ユニットテスト中心のアプローチ

却下理由: MVP 期はスペックが週単位で変わる。ユニットテストのメンテコストが体験の検証速度を下げる。

### 完全手動デプロイ

却下理由: デプロイ事故の温床。Vercel の自動化で十分。

### develop ブランチの導入

却下理由: Founder 1人では PR → main のシンプルなフローで十分。複数人になったら再検討する。
