# PostHog Events

Imaging Agriculture

Version 1.0

---

# Purpose

計測設計の正本。

実装者はこのドキュメントに従い
イベントを発火させる。

新しいイベントを追加する場合は
このドキュメントを先に更新する。

---

# Event: land_card_viewed

## 発火条件

土地カード画面が表示されたとき

（カード一覧からカードを開いた直後）

## Properties

```
card_id        : string   カードの UUID
card_title     : string   カードのタイトル
difficulty     : integer  難易度 1-5
land_type      : string   土地タイプ
source         : string   どこから来たか（home / profile / direct）
```

## 利用目的

* どのカードが最も開かれているかを把握する
* land_card_answered との比較で離脱ポイントを特定する
* source 別の流入経路を分析する

---

# Event: land_card_answered

## 発火条件

ユーザーが選択肢を選び
「回答する」ボタンをタップしたとき

## Properties

```
card_id              : string   カードの UUID
card_title           : string   カードのタイトル
difficulty           : integer  難易度 1-5
land_type            : string   土地タイプ
selected_choice      : string   選んだ選択肢のテキスト
is_recommended       : boolean  推奨回答と一致したか
time_to_answer_ms    : integer  カード表示から回答までのミリ秒
```

## 利用目的

* Answer Completion Rate の分子（result_viewed と合わせて計算）
* 回答分布（どの選択肢が選ばれているか）を把握する
* is_recommended の分布でコンテンツ難易度を調整する
* time_to_answer_ms で熟考しているか流し見かを判断する

---

# Event: result_viewed

## 発火条件

解説画面が表示されたとき

（land_card_answered の直後に遷移した画面）

## Properties

```
card_id          : string   カードの UUID
card_title       : string   カードのタイトル
difficulty       : integer  難易度 1-5
is_recommended   : boolean  推奨回答と一致したか
xp_earned        : integer  獲得した XP
```

## 利用目的

* North Star（Land Reading Sessions）のカウント単位
* Answer Completion Rate の分母
* XP 獲得の記録

---

# Event: knowledge_card_opened

## 発火条件

解説画面から知識カードリンクをタップしたとき

## Properties

```
card_id            : string   元の土地カード UUID
knowledge_title    : string   開いた知識カードのタイトル
knowledge_category : string   カテゴリ（農法 / 雑草 / 暮らし 等）
```

## 利用目的

* Knowledge Unlock Rate の計算
* どの知識カテゴリへの関心が高いか把握する
* コンテンツ制作の優先度決定に使う

---

# Event: xp_earned

## 発火条件

XP が付与されたとき

（result_viewed 直後、または条件達成時）

## Properties

```
amount         : integer   獲得 XP 量
reason         : string    付与理由（card_completed / streak_bonus 等）
total_xp       : integer   累計 XP（付与後）
current_level  : integer   現在のレベル
```

## 利用目的

* ゲーム感覚の進捗確認
* レベルアップ頻度の調整
* XP 設計のバランス検証

---

# Event: streak_updated

## 発火条件

連続記録が更新されたとき

（当日初回の result_viewed 完了時）

## Properties

```
streak_days      : integer   更新後の連続日数
is_new_record    : boolean   過去最高を更新したか
```

## 利用目的

* Streak Retention の計算
* 連続記録の分布を把握し、ユーザーの習慣化度を測る
* 連続記録リセット時の離脱との相関を分析する

---

# Event: profile_viewed

## 発火条件

プロフィール画面が表示されたとき

## Properties

```
current_level      : integer   現在のレベル
total_xp           : integer   累計 XP
cards_completed    : integer   完了済みカード数
streak_days        : integer   現在の連続日数
```

## 利用目的

* プロフィール確認頻度を把握する
* 成長実感がユーザーを引き戻すかを検証する
* cards_completed の分布でコンテンツ消費スピードを測る

---

# Implementation Notes

## 命名規則

```
[object]_[action]

object : land_card / knowledge_card / xp / streak / profile
action : viewed / answered / opened / earned / updated
```

## 共通 Properties（全イベント自動付与）

PostHog の自動収集に依存する。
追加で以下を Super Properties として設定すること。

```
app_version    : string   アプリバージョン
user_level     : integer  現在のレベル（ログイン済みの場合）
```

## 未ログインユーザー

匿名 ID で計測する。
ログイン後に PostHog の `identify` で紐付ける。

## 実装優先度

MVP で必須

1. land_card_viewed
2. land_card_answered
3. result_viewed

MVP 後に追加

4. knowledge_card_opened
5. xp_earned
6. streak_updated
7. profile_viewed
