# PostHog Events

Imaging Agriculture

Version 2.0

---

# Philosophy

計測は目的ではない。

North Star（Land Reading Sessions）を守るために計測する。
「とりあえず全部計測」は禁止。

---

# 命名規則

```
[object]_[action]

object: 操作対象（land_card / result / knowledge_card / xp / streak / profile）
action: 動詞の過去形（viewed / answered / opened / earned / updated / saved）
```

---

# MVP 必須イベント（P1 — 即実装）

North Star の計測に必要。これがなければ何もわからない。

---

## land_card_viewed

```
発火タイミング:
  土地カードの Question 画面が表示された時

目的:
  フローの開始点を計測する
  Answer Completion Rate の分母になる

Properties:
  card_id:      string   カードの一意ID
  land_type:    string   土地タイプ（平地 / 傾斜地 / 放棄地 / 草地 / 里山 等）
  difficulty:   number   難易度（1〜3）
  source:       string   どこから来たか（home / next_card / profile）
```

---

## land_card_answered

```
発火タイミング:
  ユーザーが選択肢を選び「回答する」を押した時

目的:
  Answer Completion Rate の分子
  どの選択肢が選ばれているかを把握する

Properties:
  card_id:           string   カードの一意ID
  selected_choice:   string   選んだ選択肢（A / B / C / D）
  is_recommended:    boolean  推奨回答と一致したか
  time_to_answer_ms: number   カード表示から回答までのミリ秒
```

---

## result_viewed

```
発火タイミング:
  Result 画面（推奨回答 + 解説）が表示された時

目的:
  Land Reading Session の完了を計測する（= North Star）
  この数がそのまま Land Reading Sessions 数になる

Properties:
  card_id:         string   カードの一意ID
  xp_earned:       number   獲得 XP
  is_recommended:  boolean  推奨回答を選んだか
```

---

# MVP 推奨イベント（P2 — Phase 0 で実装）

体験の深さを測るために必要。

---

## knowledge_card_opened

```
発火タイミング:
  Result 画面の解説内にある「知識カード」リンクをタップした時

目的:
  Knowledge Unlock Rate の計測
  深堀りするユーザーの割合を把握する

Properties:
  from_card_id:     string   どの土地カードの Result 画面から来たか
  knowledge_id:     string   開いた知識カードの ID
  knowledge_type:   string   種類（weed / philosophy / technique）
```

---

## xp_earned

```
発火タイミング:
  XP が加算された時

目的:
  ゲームループの動作確認
  XP 加算のバグを検出する

Properties:
  card_id:       string   どのカードで獲得したか
  xp_amount:     number   獲得 XP 量
  total_xp:      number   加算後の累計 XP
  new_level:     number   レベルアップした場合の新レベル（変化なければ現レベル）
```

---

## streak_updated

```
発火タイミング:
  連続記録（streak_days）が更新された時

目的:
  連続利用パターンの把握
  Streak Retention の計測

Properties:
  streak_days:   number   更新後の連続日数
  is_new_record: boolean  自己最高記録を更新したか
```

---

# Phase 2 以降のイベント（P3 — 今は設計のみ）

実装はユーザー100人以降で検討する。

---

## profile_viewed

```
発火タイミング:
  Profile 画面を開いた時

Properties:
  level:            number
  total_xp:         number
  cards_completed:  number
  streak_days:      number
```

---

## collection_saved

```
発火タイミング:
  お気に入り保存（Phase 3 機能）が使われた時

Properties:
  card_id:    string
  card_type:  string  （land / weed / philosophy）
```

---

## observation_logged

```
発火タイミング:
  観察ログ（Phase 3 機能）が記録された時

Properties:
  card_id:       string
  log_length:    number  文字数
```

---

# フォールバック設計

PostHog が使えない場合（オフライン等）でも
アプリの機能は動作させる。

```
実装方針:
  □ PostHog のイベント送信は try/catch で囲む
  □ 失敗してもユーザー体験を壊さない
  □ エラーは Sentry に送らない（計測エラーはノイズになる）

コード例:
  try {
    posthog.capture('result_viewed', { card_id, xp_earned, is_recommended })
  } catch {
    // 計測失敗はサイレントに処理
  }
```

---

# イベント追加ルール

新しいイベントを追加するときは:

```
1. このファイルに定義を先に書く
2. North Star または Supporting Metrics に紐づくか確認する
3. 「取りあえず計測」は追加しない
4. Properties は必要最小限にする
5. 実装後に PostHog で発火確認をする
```
