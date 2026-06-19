# Canonical Source

Imaging Agriculture

Version 2.0

---

# Purpose

仕様とコードが矛盾したとき
どちらが正しいかを決める。

答えは常に「仕様が正しい」。

コードは仕様に従う。
仕様はコードに従わない。

---

# 優先順位

矛盾が発生した場合、下記の順番で正本を判断する。

```
1. PRODUCT_THESIS.md
2. NORTH_STAR.md
3. ROADMAP.md
4. CONTENT_STRATEGY.md
5. DATA_MODEL.md
6. MVP_SCREEN_SPEC.md
7. 実装コード
```

優先順位が高いドキュメントほど「変えにくい」。
優先順位が低いドキュメントほど「変わりやすい」。

---

# 矛盾発生時のルール

## 仕様 vs コードが矛盾した場合

```
コードを仕様に合わせる。
仕様を変えたいなら先にドキュメントを更新する。

禁止:
  □ 「コードがこうなっているから仕様もこれでいい」
  □ 口頭で決めてドキュメントを更新しない
  □ PR コメントだけに残して正本に反映しない
```

## 上位ドキュメント vs 下位ドキュメントが矛盾した場合

```
上位ドキュメントに従い、下位ドキュメントを更新する。

例:
  ROADMAP.md が「雑草カードは Phase 2」と書いているのに
  MVP_SCREEN_SPEC.md に雑草カードの画面が書かれている
  → MVP_SCREEN_SPEC.md を修正する（Phase 2 の予定として記載）
```

## どちらが正本か不明な場合

```
GOVERNANCE.md の Document Priority に従う。
不明なまま実装しない。
Founder が判断してドキュメントを更新してから実装する。
```

---

# Document Registry

## PRODUCT_THESIS

```
場所:    docs/PRODUCT_THESIS.md
責務:    なぜ作るか（Why / Vision / Mission）
権限:    Founder のみ変更可
頻度:    低（方向転換時のみ）
ルール:  このファイルが変わる = プロダクトの根本が変わる
```

---

## NORTH_STAR

```
場所:    docs/NORTH_STAR.md
責務:    成功の定義（North Star Metric / 追う指標 / 追わない指標）
権限:    Founder のみ変更可
頻度:    低（フェーズ転換時のみ）
ルール:  North Star = Land Reading Sessions は MVP では変えない
```

---

## ROADMAP

```
場所:    docs/ROADMAP.md
責務:    フェーズ管理（何をいつ作るか）
権限:    Founder
頻度:    中（フェーズ完了・方針変更時）
ルール:  スコープ外の機能は ROADMAP に追記してから実装を検討する
```

---

## CONTENT_STRATEGY

```
場所:    docs/CONTENT_STRATEGY.md
責務:    コンテンツ正本（何を / どの順番で / 何枚作るか）
権限:    Founder / コンテンツ担当
頻度:    中
ルール:  「知識問題」「観察問題」の判断基準はここが正本
```

---

## DATA_MODEL

```
場所:    docs/DATA_MODEL.md
責務:    DB 正本（テーブル / フィールド / フェーズごとの実装範囲）
権限:    Founder / 開発担当
頻度:    中（フェーズ追加時）
ルール:  DB 変更は DATA_MODEL.md を先に更新してから実装する
         correct_answer は使わない。recommended_answer を使う
```

---

## MVP_SCREEN_SPEC

```
場所:    docs/MVP_SCREEN_SPEC.md
責務:    UI 正本（画面構成 / 各画面の目的 / UX ルール）
権限:    Founder / デザイン担当
頻度:    高（MVP 検証中）
ルール:  UI 変更は SCREEN_SPEC を先に更新してから実装する
```

---

## CI_CD_ARCHITECTURE

```
場所:    docs/CI_CD_ARCHITECTURE.md
責務:    開発パイプライン正本
権限:    Founder / 開発担当
頻度:    低〜中
ルール:  パイプライン変更は ADR を作成して記録する
```

---

## RELEASE_GATE

```
場所:    docs/RELEASE_GATE.md
責務:    リリース判定基準正本
権限:    Founder のみ
頻度:    低
ルール:  ゲートを省略したリリースは禁止
```

---

## BRANCH_STRATEGY

```
場所:    docs/BRANCH_STRATEGY.md
責務:    ブランチ運用正本
権限:    Founder / 開発担当
頻度:    低
ルール:  main への直接 push は原則禁止
```

---

## ARCHITECTURE

```
場所:    docs/ARCHITECTURE.md
責務:    技術構成正本（スタック / システム構成 / Non Goals）
権限:    Founder / 開発担当
頻度:    低（スタック変更時のみ）
ルール:  新しい外部サービス追加は ADR を作成する
```

---

## POSTHOG_EVENTS

```
場所:    analytics/POSTHOG_EVENTS.md
責務:    計測設計正本（イベント一覧 / Properties / 指標との紐付け）
権限:    Founder / 開発担当
頻度:    中（機能追加時）
ルール:  新しい機能のイベントは先にここに定義してから実装する
```

---

## FOUNDER_DASHBOARD

```
場所:    analytics/FOUNDER_DASHBOARD.md
責務:    指標定義正本（定義 / 目標値 / 確認頻度）
権限:    Founder のみ
頻度:    低
ルール:  指標の定義を変える場合はここを更新してから PostHog の設定を変える
```

---

## CUSTOMER_TRUTH_REPOSITORY

```
場所:    research/CUSTOMER_TRUTH_REPOSITORY.md
責務:    ユーザー観察正本（行動変化 / 認識変化 / 感情変化）
権限:    全員（追記） / Founder（削除）
頻度:    高（ユーザー接触のたびに）
ルール:  機能要望ではなく「真実の声」だけを記録する
```

---

## GOVERNANCE

```
場所:    governance/GOVERNANCE.md
責務:    意思決定ルール正本
権限:    Founder のみ
頻度:    低
ルール:  意思決定のルール自体を変える場合はここを更新する
```

---

## QUALITY_GATE

```
場所:    docs/QUALITY_GATE.md
責務:    品質基準正本（チェックリスト / 禁止事項）
権限:    Founder のみ
頻度:    低
ルール:  品質基準を下げる方向の変更は原則禁止
```

---

# 更新手順

ドキュメントを更新するときのルール。

```
1. 何を変えるかを決める
2. 上位ドキュメントと矛盾しないか確認する
3. ドキュメントを更新する（コードより先に）
4. 更新内容を PR / コミットメッセージに記録する
5. 下位ドキュメントとの整合を確認する
6. 実装コードを更新する（必要な場合）
```

口頭・チャット・PR コメントだけで終わらせない。
必ず正本ドキュメントに反映させる。
