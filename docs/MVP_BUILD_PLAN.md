# MVP Build Plan

Imaging Agriculture

Version 1.0

---

# Product Goal

土地を見る回数を増やす。
土地を想像する回数を増やす。

完璧なアプリを作らない。
最短でユーザーに触ってもらい、
土地を見る目が変わるかを検証する。

---

# Build Philosophy

速く作る。しかし雑に作らない。

品質ゲート（QUALITY_GATE.md）は必ず守る。
テストなしのマージは禁止。

---

# North Star

Land Reading Sessions

---

# MVP Scope

## 実装する（IN）

```
Home         今日の土地カード表示
Land Card    写真 + 問い + 選択肢
Answer       回答送信
Result       推奨回答 + 解説
Profile      レベル + XP + 完了カード数
XP           回答完了で加算
Level        XP蓄積でレベルアップ
```

## 実装しない（OUT）

```
SNS          フォロー・コメント・DM
コミュニティ  Phase 5 以降
通知         プッシュ通知全般
課金         Phase 3 以降
AI診断       Phase 4 以降
雑草判定     Phase 4 以降
雑草カード   Phase 2 以降
思想カード   Phase 2 以降
ランキング   永久に不要
```

---

# Phase 0 — 準備（Day 0）

目的: 実装を始める前の準備を全て完了させる。

---

## タスク一覧

### コンテンツ準備

```
□ MVP_CARD_SET.md 作成（実装する最初の20枚を確定）
  参照: CONTENT_GAP_ANALYSIS.md のMVP最初の20カード
□ 20枚分の土地写真を収集・選定
  基準: VISUAL_DIRECTION.md の写真方針に従う
  形式: WebP / 1200px以上 / 各カード1〜3枚
□ Supabase にカードデータを手動投入
```

### インフラ準備

```
□ GitHub リポジトリ確認（ブランチ保護設定）
□ GitHub Actions 設定確認（ci.yml が動くか）
□ Supabase プロジェクト作成
□ PostHog プロジェクト作成（Free プラン）
□ Sentry プロジェクト作成
□ Playwright 設定確認（playwright.config.ts）
□ Vercel / デプロイ先の準備
```

### ドキュメント準備

```
□ DATA_MODEL.md の MVP Tables を実装可能な形に変換
□ MVP_SCREEN_SPEC.md の全画面を再確認
□ QUALITY_GATE.md を開発者全員で確認
```

---

## 完了条件

```
□ 土地カード20枚の写真と問いが確定している
□ Supabase に land_cards テーブルが存在し、データが入っている
□ GitHub Actions が push で自動実行される
□ Playwright が 0 件テストで通る状態
□ Sentry の DSN が取得できている
```

---

# Phase 1 — 基盤構築（Day 1-2）

目的: カードが表示され、回答が保存され、XPが加算される状態を作る。

---

## Day 1 タスク

```
□ Next.js プロジェクト初期セットアップ
□ Supabase クライアント設定
□ 認証（匿名ユーザー対応 → ログインは後）
□ land_cards テーブルからカードを取得するAPI / Server Action
□ Home 画面: Featured Land Card の表示
□ 土地カード写真の表示（MapLibre or 単純なimg）
□ DATA_MODEL.md 更新確認
□ GitHub Actions 通過確認
```

---

## Day 2 タスク

```
□ Question 画面: 問い + 選択肢の表示
□ Answer 処理: 選択肢選択 → user_answers に保存
□ XP 加算: user_progress.xp 更新
□ Level 計算: XP に応じたレベル計算ロジック
□ Profile 画面: Level / XP / cards_completed の表示
□ Playwright テスト: Profile 画面が表示されること
□ DATA_MODEL.md 更新
□ MVP_SCREEN_SPEC.md 更新
```

---

## 完了条件

```
□ カードが画面に表示される
□ 選択肢をタップして「回答する」を押すと Supabase に保存される
□ XP が加算される
□ Profile 画面が開ける
□ GitHub Actions green
□ Playwright: profile.spec.ts が通る
□ Sentry に接続されている（テストエラーが記録できるか確認）
```

---

# Phase 2 — 体験構築（Day 3-4）

目的: Home → Question → Answer → Result → XP の主要導線を完成させる。

---

## Day 3 タスク

```
□ Result 画面: 推奨回答 + 解説 + XP獲得表示
□ 解説テキストのMarkdownレンダリング
□ 「次の土地へ」ボタン → 次のカードへ遷移
□ PostHog イベント実装（最優先3つ）:
    land_card_viewed
    land_card_answered
    result_viewed
□ Playwright テスト: 主要導線（land-card-flow.spec.ts）追加
□ GitHub Actions 通過確認
```

---

## Day 4 タスク

```
□ Home 画面の完成: Daily Streak / 最近見た土地
□ ストリーク（連続記録）ロジック: user_progress.streak_days
□ XP → Level 計算の確認（1,000XP = Lv2 等、仮設定）
□ 画面遷移のアニメーション（フェードのみ）
□ モバイル表示の確認（iPhone 14 Safari）
□ Playwright: iPhone 14 でのテスト通過確認
□ エラーハンドリング: Supabase 接続失敗時の表示
□ 全 Playwright テスト通過確認
```

---

## 完了条件

```
□ Home → Question → Answer → Result → XP の導線が全て動く
□ Playwright: land-card-flow.spec.ts 全4テスト通過
□ Playwright: profile.spec.ts 全2テスト通過
□ PostHog に land_card_viewed / answered / result_viewed が届いている
□ Sentry にエラーが出ていない
□ GitHub Actions green
□ スマートフォン（縦持ち）で一通り操作できる
```

---

# Phase 3 — UX改善（Day 5）

目的: 機能追加ゼロ。体験の磨き込みのみ。

---

## タスク

```
□ 写真の表示品質確認（WebP最適化 / 遅延読み込み）
□ 余白の調整（VISUAL_DIRECTION.md 参照）
□ 解説テキストの改善（BRAND_GUIDELINES.md の文章ルール適用）
□ 「回答する」ボタンの非活性状態の確認
□ 結果画面の推奨回答のトーン確認（「正解！」禁止）
□ XP演出を控えめに調整（大きなアニメーション禁止）
□ ロードが遅い箇所の確認 / 改善
□ 不要なUIの削除（見た目を複雑にしているものを削る）
```

---

## 完了条件

```
□ 写真が3秒以内に表示される（低速回線でも）
□ 「正解！」「やった！」の文言がない
□ 余白がVISUAL_DIRECTION.mdの基準を満たしている
□ 「この土地、いいな」と思える写真が主役になっている
□ 全 Playwright テスト通過（変更後も）
```

---

# Phase 4 — テスト（Day 6）

目的: 自信を持ってリリースできる状態にする。

新機能追加禁止。

---

## タスク

```
□ 全 Playwright テスト: ローカルで通過確認
□ GitHub Actions: main ブランチで green
□ Sentry: 過去24時間のエラーを確認・解消
□ 手動テスト（Founderが実機で全導線を通る）
    iPhone / Android / Mac Chrome / Windows Chrome
□ PostHog: 各イベントが正しく届いているか確認
□ バグリスト作成 → 重要度判定 → MVP前修正 / 後回し
□ データバックアップ確認（Supabase）
□ デプロイ手順の確認（本番環境へのデプロイが問題なくできるか）
```

---

## 完了条件

```
□ 全 Playwright テスト: green
□ GitHub Actions: green
□ Sentry: エラー 0件（過去24時間）
□ Founder が手動で全導線を完了できた
□ PostHog でイベントが届いていることを確認
□ Known bugs がリスト化されている
□ 本番デプロイが完了している
```

---

# Phase 5 — 公開（Day 7）

目的: 最初の5人に触ってもらう。

---

## 対象ユーザー

```
優先1: 農業に興味がある友人・知人（2〜3人）
優先2: 自然農・有機農業に興味がある知人（1〜2人）
優先3: X（旧Twitter）・Instagramでの告知（小規模）
```

---

## 公開当日タスク一覧

```
□ 本番環境が動いているか最終確認
□ Sentry アラートを自分のメールに設定
□ PostHog ダッシュボードを開いた状態にする
□ テスト5人に「使ってみてほしい」と連絡する
□ USER_TEST_SCRIPT.md の利用前インタビューを実施
□ 当日の Land Reading Sessions 数をメモする
□ エラーが出た場合の連絡先をユーザーに伝える（LINE / DM）
```

---

## ユーザーへの伝え方

```
【伝える内容】
「農地・草地・雑草を見る楽しさを育てるアプリを作りました。
 農業知識ゼロでも大丈夫です。
 正解・不正解より、土地を見て何を想像するか、を楽しんでください。
 30分後に感想を聞かせてください」

【伝えない内容】
「農業学習アプリです」
「知識が増えます」
「難しいですが頑張って」
```

---

# 14 Day Review

公開から14日後に判定を行う。

---

## 評価テンプレート

```
=== 14 Day Review ===

実施日: YYYY-MM-DD
Founder: 

--- 定量指標 ---
Land Reading Sessions（累計）: __
DAU（14日平均）: __
D1 Retention: __%
D7 Retention: __%
回答完了率: __%
平均セッション時間: __分

--- 定性指標 ---
★★★シグナル件数: __件
★★シグナル件数: __件
失敗シグナル件数: __件

--- 判定 ---
□ 継続（Phase 1 へ進む）
□ 改善（何を1点修正するか）:
□ 停止（理由）:

--- 次のアクション ---
1. 
2. 
3. 
```

---

# リスク一覧

| リスク | 影響度 | 対策 |
|-------|-------|------|
| 写真の権利問題 | 高 | 自分で撮影 or CC0のみ使用 |
| Supabase 無料枠オーバー | 中 | 初期は5〜10人なので問題なし / 監視設定 |
| カードが面白くない | 高 | 5人テスト後に即改善。コンテンツ磨きを優先 |
| 写真の品質が低い | 高 | Phase 0 で写真を厳選。妥協しない |
| 回答完了率が低い | 中 | 問いを「観察系」に戻す。難易度を下げる |
| CI/CDの設定ミス | 低 | Phase 0 で事前確認済み |
| Playwright テストの不安定 | 低 | retries: 2 で対応 |
| 本番エラー | 中 | Sentry で即時検知 / 当日対応 |

---

# MVPで削るべき機能一覧

以下は「あると良さそう」だが MVP には入れない。

```
□ オンボーディングチュートリアル
  理由: コンテンツの質が高ければ不要。後で追加できる

□ 検索・フィルタ機能
  理由: カード20枚では不要

□ お気に入り保存
  理由: Phase 3 の機能

□ カードの共有機能
  理由: まず一人で体験価値を確認する

□ 詳細なプロフィール設定
  理由: 名前・アバターなどは後回し

□ プッシュ通知
  理由: 義務感を作らない

□ ダークモード
  理由: 写真の見え方が変わるためMVP後に検討

□ タブバーのアニメーション
  理由: UXより速度を優先
```

---

# MVP後に追加する候補機能

Phase 1 以降で検討。

```
優先高
□ 雑草カード（Weed Cards）
□ 知識カードリンクの充実
□ 連続記録の可視化改善
□ オンボーディング

優先中
□ お気に入りカード保存
□ 土地タイプ別フィルタ
□ カード共有（テキスト共有のみ）

優先低
□ 農法・思想カード（Philosophy Cards）
□ コミュニティ機能
□ AI雑草判定
```

---

# リリース判定チェックリスト

公開前に全て □ にすること。

```
品質
□ 全 Playwright テスト: green
□ GitHub Actions: green
□ Sentry: エラー 0件（過去24時間）
□ 手動テスト: 全導線を完了できた（Founder確認）

コンテンツ
□ 土地カードが最低10枚表示できる
□ 全カードに写真がある
□ 問いが「観察問題」になっている（知識問題がない）
□ 解説に「正解」「不正解」の言葉がない

データ
□ Supabase に land_cards データが入っている
□ user_answers が保存される
□ XP が加算される

計測
□ PostHog: land_card_viewed が届いている
□ PostHog: result_viewed が届いている
□ Sentry: アラートメールが設定されている

準備
□ 公開URLが確定している
□ 5人のテスト参加者に連絡した
□ USER_TEST_SCRIPT.md を手元に用意した
□ CUSTOMER_TRUTH_REPOSITORY.md を開いた状態にした
```

---

# Founder Rules（再確認）

実装前に必ず自問する。

```
この機能は
土地を見る楽しさを増やすか？

YES → 実装候補
NO  → 実装しない
迷ったら → 機能を増やさず、土地カードを増やす
```
