# Imaging Agriculture Development Constitution

このファイルは、このリポジトリにおける最上位の開発ガイドラインである。

Claude Code は作業開始前に必ず読むこと。

---

# Product Identity

Imaging Agriculture は農業アプリではない。

土地を読む力を育てるアプリである。

---

Mission

土地を見る楽しさを広げる

---

Vision

誰もが土地を見て

「ここなら何を育てたいだろう」

と想像できる世界をつくる

---

Core Loop

土地を見る

↓

考える

↓

選ぶ

↓

学ぶ

↓

また土地を見る

---

# Fundamental Principle

知識を増やすな

想像力を増やせ

---

答えを教えるな

観察を促せ

---

農業を教えるな

土地を見る楽しさを伝えろ

---

ユーザーを農家にするな

土地好きにしろ

---

# Product Philosophy

人を変えるのではない

世界の見え方を変える

---

AgriPath

↓

自分を知る

---

Imaging Agriculture

↓

土地を知る

---

# Authority Order

仕様の優先順位

1. PRODUCT_THESIS.md
2. NORTH_STAR.md
3. ROADMAP.md
4. CONTENT_STRATEGY.md
5. DATA_MODEL.md
6. MVP_SCREEN_SPEC.md
7. 実装コード

コードは仕様に従う

仕様はコードに従わない

---

# Canonical Sources

PRODUCT_THESIS.md

なぜ作るか

---

NORTH_STAR.md

成功の定義

---

ROADMAP.md

開発フェーズ

---

CONTENT_STRATEGY.md

コンテンツ正本

---

DATA_MODEL.md

データ構造正本

---

MVP_SCREEN_SPEC.md

UI正本

---

# MVP Rule

MVPで守ること

土地を見る

↓

考える

↓

学ぶ

この体験を壊さない

---

MVPで作らない

* SNS
* コメント
* フォロー
* DM
* コミュニティ
* 農地売買
* AI土地診断
* AI雑草判定
* 複雑なプロフィール

---

機能追加時は

「土地を見る楽しさを増やすか？」

を最優先で判断する

---

# Quality Gate

新機能追加時は必須

□ PRODUCT_THESIS確認

□ ROADMAP確認

□ DATA_MODEL更新確認

□ MVP_SCREEN_SPEC更新確認

□ Playwrightテスト追加

□ GitHub Actions通過

□ Sentry監視対象確認

□ ADR必要性確認

---

以下は禁止

動くからマージする

---

# Pull Request Rules

PR作成時は必ず報告する

1. 変更内容

2. 影響ファイル

3. DATA_MODEL変更有無

4. SCREEN_SPEC変更有無

5. テスト追加内容

6. リスク

7. ロールバック方法

---

# UX Guardian Rules

以下を常に確認する

この機能は

学習を増やしているか？

それとも観察を増やしているか？

---

観察を増やしていなければ却下

---

# Content Rules

Land Card が最重要資産

コードより価値が高い

---

悪いカード

知識問題

例

スギナの特徴は？

---

良いカード

観察問題

例

スギナが広がっている

この土地から何を想像する？

---

# Analytics

North Star

Land Reading Sessions

---

追う指標

* DAU
* Answer Completion Rate
* D1 Retention
* D7 Retention
* D30 Retention
* Knowledge Unlock Rate

---

追わない指標

* フォロワー数
* PV
* コメント数

---

# Customer Truth

機能要望を追うな

ユーザーの行動変化を追え

---

重要な発言例

旅行中に畑を見るようになった

---

雑草を見るのが楽しくなった

---

土地を見る目が変わった

---

# Founder Question

実装前に必ず自問すること

この機能は

土地を見る回数を増やすか？

それとも複雑さを増やすだけか？

---

迷ったらシンプルを選ぶ

迷ったら土地カードを増やす

迷ったらユーザー観察を優先する
