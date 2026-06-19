# Founder Dashboard

Imaging Agriculture

Version 1.0

---

# North Star

## Land Reading Sessions

定義

ユーザーが土地カードを開き
回答し
結果画面まで到達した回数

単位

セッション数 / 期間

確認頻度

毎日

---

# Primary Metrics

## DAU

Daily Active Users

定義

当日に 1 回以上 Land Reading Session を完了したユニークユーザー数

なぜ追うか

土地を読む習慣が日常化しているかを示す

目標（MVP）

未設定（計測開始後に設定）

---

## WAU

Weekly Active Users

定義

過去 7 日間に 1 回以上 Land Reading Session を完了したユニークユーザー数

なぜ追うか

週単位の継続利用を確認する

目標（MVP）

未設定

---

## MAU

Monthly Active Users

定義

過去 30 日間に 1 回以上 Land Reading Session を完了したユニークユーザー数

なぜ追うか

プロダクトの実質的な利用者規模を示す

目標（MVP）

未設定

---

## Answer Completion Rate

回答完了率

定義

land_card_viewed イベント数に対する
result_viewed イベント数の割合

計算式

result_viewed ÷ land_card_viewed × 100

なぜ追うか

カードを開いたユーザーが最後まで体験しているかを示す

MVP 成功条件

70% 以上

---

## D1 Retention

1日後リテンション

定義

初回 Land Reading Session 完了日の翌日に
再度 Land Reading Session を完了したユーザーの割合

なぜ追うか

初回体験が次の行動を生んでいるかを示す

目標（MVP）

未設定

---

## D7 Retention

7日後リテンション

定義

初回 Land Reading Session 完了日から 7 日後に
再度 Land Reading Session を完了したユーザーの割合

なぜ追うか

習慣化の兆候を示す

目標（MVP）

未設定

---

## D30 Retention

30日後リテンション

定義

初回 Land Reading Session 完了日から 30 日後に
再度 Land Reading Session を完了したユーザーの割合

なぜ追うか

長期的な定着を示す

目標（MVP）

未設定

---

## Average Cards Per User

ユーザーあたり平均カード数

定義

計測期間内の total Land Reading Sessions ÷ DAU（または MAU）

なぜ追うか

1 ユーザーが平均何枚の土地を読んでいるかを示す
深さの指標

目標（MVP）

未設定

---

## Knowledge Unlock Rate

知識カード解放率

定義

Land Reading Session 完了後に
knowledge_card_opened イベントが発火したセッションの割合

計算式

knowledge_card_opened セッション数 ÷ result_viewed 数 × 100

なぜ追うか

解説から知識探索へ進むユーザーの割合を示す
コンテンツの深さへの興味を測る

目標（MVP）

未設定

---

## Streak Retention

連続記録継続率

定義

streak_days ≥ 3 のユーザーの割合（アクティブユーザー中）

なぜ追うか

土地を見る習慣が形成されているかを示す
習慣化の代理指標

目標（MVP）

未設定

---

# Anti-Metrics

追わない指標

フォロワー数

コメント数

SNS 利用数

PV

これらは Land Reading Sessions に直結しないため
追わない。

---

# Dashboard Layout（想定）

```
┌─────────────────────────────────┐
│  Land Reading Sessions [今日]    │
│  [昨日比 ±%]                    │
├──────────────┬──────────────────┤
│  DAU         │  Answer Complete │
│              │  Rate            │
├──────────────┼──────────────────┤
│  D1 / D7 / D30 Retention       │
├──────────────┴──────────────────┤
│  Avg Cards/User  │  Streak Rate │
└─────────────────────────────────┘
```

PostHog の Insights + Dashboard 機能で構築する。

---

# Review Routine

毎朝

Land Reading Sessions（前日）を確認

毎週月曜

WAU / Retention / Answer Completion Rate を確認

フェーズ完了時

全指標を振り返り ROADMAP の次フェーズ判断に使う
