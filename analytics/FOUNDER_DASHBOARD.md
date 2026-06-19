# Founder Dashboard

Imaging Agriculture

Version 2.0

---

# Philosophy

多くを追うな。
North Star を守れ。

毎日5分で確認できる指標だけを追う。

---

# North Star Metric

## Land Reading Sessions

定義:
  ユーザーが土地カードを開き → 回答し → Result 画面を見た 1 回のセッション

なぜこれか:
  このアプリの核心体験が1回完了したことを示す唯一の指標。
  「土地カードを見ただけ」「途中離脱」は含まない。

PostHog での計測:
  result_viewed イベントの発火数 = Land Reading Sessions 数

目標:
  Phase 0（MVP）: 累計 100 sessions（30人 × 3〜4 sessions）
  Phase 1:        月次 500 sessions
  Phase 2:        月次 2,000 sessions
  Phase 3:        月次 10,000 sessions

---

# 毎日確認する指標（Daily）

確認時間: 朝5分

---

## DAU

```
定義:   当日に Land Reading Session を1回以上完了したユーザー数
目標:   Phase 0 = 5人以上
確認先: PostHog → Insights → DAU
異常:   前日比 -50% 以上 → Sentry でエラー確認
```

---

## Answer Completion Rate

```
定義:   land_card_viewed に対する land_card_answered の割合
        answered ÷ viewed × 100
目標:   80% 以上
確認先: PostHog → Funnels
異常:   70% を下回る → 問いが難しすぎる / UX に問題がある可能性
```

---

## Land Reading Sessions（当日）

```
定義:   当日の result_viewed 発火数
目標:   DAU × 2 以上（1人が平均2回完了）
確認先: PostHog → Insights → result_viewed count
異常:   DAU より大幅に少ない → Result 画面まで届いていない可能性
```

---

# 週次確認する指標（Weekly）

確認タイミング: 毎週月曜日

---

## D1 Retention

```
定義:   初回利用翌日にも利用したユーザーの割合
目標:   Phase 0 = 30% 以上
確認先: PostHog → Retention
判断:   30% 未満 → 初回体験に問題がある可能性
```

---

## D7 Retention

```
定義:   初回利用から7日後にも利用したユーザーの割合
目標:   Phase 0 = 20% 以上
確認先: PostHog → Retention
判断:   20% 未満 → 習慣化できていない
```

---

## Knowledge Unlock Rate

```
定義:   Result 画面から knowledge_card_opened を発火したユーザーの割合
        knowledge_card_opened ÷ result_viewed × 100
目標:   20% 以上
確認先: PostHog → Funnels
判断:   低い → 解説の「もっと知る」誘導が弱い
        高い（60%超） → 知識学習アプリになっている（要注意）
```

---

## Streak Retention

```
定義:   streak_days ≥ 3 のユーザー数
目標:   アクティブユーザーの30%
確認先: Supabase → user_progress → streak_days 集計
判断:   低い → 日常の習慣になっていない
```

---

# 月次確認する指標（Monthly）

確認タイミング: 月初

---

## D30 Retention

```
定義:   初回利用から30日後にも利用したユーザーの割合
目標:   Phase 0 = 10% 以上
確認先: PostHog → Retention
判断:   10% 未満 → 体験価値を再検証する
        10% 以上 → Phase 1 進行の判断材料になる
```

---

## Cards Viewed per User

```
定義:   月間の land_card_viewed 総数 ÷ MAU
目標:   10枚以上 / 月 / 人
確認先: PostHog → Insights
判断:   低い → コンテンツ量不足 / リピート動機が弱い
```

---

# 追わない指標（Anti-Metrics）

```
❌ PV
❌ フォロワー数・SNS 反応数
❌ コメント数
❌ インストール数
❌ 正答率（正解/不正解の概念がない）
❌ 「学習時間」（勉強アプリではない）
```

---

# 失敗シグナル

```
・Answer Completion Rate < 70%
  → 問いが難しすぎる / UX に問題

・D7 Retention < 10%
  → 体験に価値が感じられていない

・D30 Retention < 5%
  → 根本的な体験価値の問題

・Knowledge Unlock Rate > 60%
  → 知識学習アプリになっている（Failure）

・Land Reading Sessions < DAU
  → Result 画面に届いていない
```

---

# PostHog ダッシュボード構成

```
Panel 1: North Star
  → result_viewed の日次推移（折れ線）

Panel 2: Funnel
  → land_card_viewed → land_card_answered → result_viewed

Panel 3: Retention
  → D1 / D7 / D30

Panel 4: DAU
  → 日次推移

Panel 5: Knowledge Unlock
  → knowledge_card_opened ÷ result_viewed
```

---

# 確認ルーティン

```
毎朝（5分）:
  □ PostHog: DAU / Land Reading Sessions / Answer Completion Rate
  □ Sentry: エラー未発生確認

毎週月曜（15分）:
  □ D1 / D7 / Knowledge Unlock / Streak 確認
  □ 異常指標の原因分析
  □ CUSTOMER_TRUTH_REPOSITORY.md に観察追記
  □ 翌週の改善アクション1つ決定

月初（30分）:
  □ D30 Retention 確認
  □ Land Reading Sessions 累計確認
  □ Phase 進行判断
  □ NORTH_STAR.md 目標との比較
```
