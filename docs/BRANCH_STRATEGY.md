# Branch Strategy

Imaging Agriculture

Version 1.0

---

# Philosophy

Founder 1人の開発に最適化する。

複雑なブランチ戦略は維持コストになる。
MVP フェーズは最小限のブランチで高速に動く。

---

# MVP フェーズ（〜MAU 100人）のブランチ構成

```
main
 └── feature/*
 └── hotfix/*
```

`develop` ブランチは MVP フェーズでは使わない。
複数人開発・複数リリースが同時進行するときに導入を検討する。

---

# ブランチ定義

## main

```
役割:
  本番環境と同期するブランチ

ルール:
  □ 直接 push 禁止（hotfix を除く）
  □ feature/* または hotfix/* からの PR のみ受け付ける
  □ GitHub Actions（quality + playwright）が green のみマージ可
  □ Vercel が main に自動デプロイする

保護設定（GitHub Branch Protection）:
  ✅ Require status checks to pass before merging
     → CI / Playwright
  ✅ Require branches to be up to date before merging
  ✅ Do not allow bypassing the above settings
```

---

## feature/*

```
役割:
  機能開発・改善・コンテンツ追加の作業ブランチ

命名規則:
  feature/[機能名]
  例:
    feature/land-card-result-screen
    feature/xp-animation
    feature/add-land-cards-batch-2
    feature/fix-profile-display

作業ルール:
  □ main から切る
  □ 1 feature/* = 1 PR = 1 マージコミット
  □ 長期間（3日以上）作業が続く場合は main に rebase してズレを防ぐ
  □ 作業完了 → PR → GitHub Actions → Founder Review → Squash Merge

マージ後:
  □ feature/* ブランチは削除する（GitHub の設定で自動削除）
  □ main が最新の状態になっていることを確認する
```

---

## hotfix/*

```
役割:
  本番の緊急バグ修正

命名規則:
  hotfix/[問題の概要]
  例:
    hotfix/card-not-loading
    hotfix/xp-calculation-error
    hotfix/supabase-connection-timeout

作業ルール:
  □ main から切る（develop からではない）
  □ 最小限の修正のみ（改善は別 feature/* で）
  □ GitHub Actions は省略しない
  □ main に直接マージ（PR 経由）
  □ マージ後に Smoke Test を必ず実施

詳細: RELEASE_GATE.md「緊急修正ルール」参照
```

---

# マージ条件

## feature/* → main

```
必須:
  □ GitHub Actions（quality job）: green
  □ GitHub Actions（playwright job）: green
  □ Vercel Preview で Founder が目視確認済み
  □ QUALITY_GATE.md のチェックリスト完了

方法:
  Squash Merge（コミット履歴をきれいに保つ）

コミットメッセージ形式:
  [変更タイプ]: [変更内容]
  例:
    feat: Result 画面に推奨回答を表示
    fix: XP が正しく加算されない問題を修正
    content: 土地カード10枚追加（里山エリア）
    docs: DATA_MODEL に user_progress を追加
    test: Land Card Flow の Playwright テストを追加
```

---

## hotfix/* → main

```
必須:
  □ GitHub Actions（quality + playwright）: green
  □ 修正内容の確認

方法:
  Merge Commit（hotfix の履歴を残す）

コミットメッセージ形式:
  hotfix: [修正内容]
  例:
    hotfix: 土地カードが読み込まれない問題を修正
```

---

# よくある作業フロー

## 通常の機能開発

```bash
# 1. feature ブランチを切る
git checkout main
git pull
git checkout -b feature/result-screen-improvement

# 2. 開発・コミット
git add .
git commit -m "feat: Result 画面の推奨回答表示を改善"

# 3. ローカルで Playwright を実行
npx playwright test

# 4. PR を出す
git push origin feature/result-screen-improvement
# GitHub で PR を作成

# 5. GitHub Actions が自動で実行される
# 6. Vercel Preview URL で確認
# 7. Squash Merge
```

---

## 土地カードのコンテンツ追加

```bash
# コンテンツ追加も feature/* ブランチで管理
git checkout -b feature/land-cards-batch-3

# カードデータを Supabase に追加
# LAND_CARDS_SEED.md を更新
git add .
git commit -m "content: 土地カード8枚追加（棚田・果樹園）"

git push origin feature/land-cards-batch-3
# PR → Merge
```

---

## 緊急修正

```bash
# hotfix ブランチを main から切る
git checkout main
git pull
git checkout -b hotfix/card-loading-error

# 修正
git add .
git commit -m "hotfix: Supabase クエリのタイムアウト設定を追加"

# GitHub Actions を通す（省略禁止）
git push origin hotfix/card-loading-error
# PR → Merge → Smoke Test
```

---

# release/* ブランチの評価

## 採用しない（MVP フェーズ）

```
理由:
  □ Founder 1人のため、複数バージョンの並行管理が不要
  □ Vercel は main の自動デプロイで十分
  □ release/* はステージング環境が必要な時に意味を持つ
  □ MVP では「常に main = 本番」でよい

導入を検討するタイミング:
  □ 開発メンバーが複数人になった
  □ 機能リリースとバグ修正を独立して管理したい
  □ 定期リリース（週次など）のサイクルが生まれた
  → MAU 500人〜 1,000人 の段階で再評価する
```

---

# ブランチ保護設定（GitHub）

main ブランチに以下の Branch Protection Rules を設定する。

```
Settings → Branches → Add branch protection rule

Branch name pattern: main

✅ Require a pull request before merging
   ✅ Require approvals: 0（Founder 1人のため不要）

✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Status checks:
     - CI / Lint / Typecheck / Build
     - CI / Playwright E2E

✅ Do not allow bypassing the above settings
   （hotfix の緊急時は一時的に解除して対応）

✅ Automatically delete head branches after merge
```
