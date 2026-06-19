# Imaging Agriculture Data Model

Version 1.0

Purpose

土地を読む体験を記録し、
観察力の成長を可視化する。

---

# Core Entities

1. users

2. land_cards

3. weed_cards

4. philosophy_cards

5. user_answers

6. user_progress

7. user_unlocks

---

# users

認証ユーザー

Source

Supabase Auth

---

id

uuid

PK

---

email

text

---

created_at

timestamp

---

# land_cards

土地観察コンテンツ

---

id

uuid

PK

---

title

text

例

雑草が広がる南向き斜面

---

image_url

text

---

question

text

例

この土地なら何を植える？

---

choices

jsonb

例

[
"果樹",
"野菜",
"穀物",
"森林農法"
]

---

recommended_answer

text

※正解ではなく推奨回答

---

explanation

text

---

difficulty

integer

1-5

---

land_type

text

例

平地

傾斜地

放棄地

里山

---

tags

text[]

---

xp_reward

integer

default 10

---

knowledge_links

uuid[]

---

created_at

timestamp

---

# weed_cards

雑草知識

---

id

uuid

PK

---

name

text

例

スギナ

---

image_url

text

---

summary

text

---

characteristics

text

---

soil_signal

text

例

酸性傾向

排水性

硬盤層の可能性

---

related_land_types

text[]

---

related_philosophies

uuid[]

---

difficulty

integer

1-5

---

created_at

timestamp

---

# philosophy_cards

農法・思想

---

id

uuid

PK

---

title

text

例

草生農法

---

category

text

例

農法

思想

暮らし

---

summary

text

---

description

text

---

benefits

text[]

---

suitable_land

text[]

---

related_cards

uuid[]

---

created_at

timestamp

---

# user_answers

土地カード回答履歴

---

id

uuid

PK

---

user_id

uuid

FK users

---

land_card_id

uuid

FK land_cards

---

selected_choice

text

---

recommended_match

boolean

---

xp_earned

integer

---

answered_at

timestamp

---

# user_progress

成長データ

---

user_id

uuid

PK

---

level

integer

default 1

---

xp

integer

default 0

---

cards_completed

integer

default 0

---

streak_days

integer

default 0

---

last_activity_at

timestamp

---

# user_unlocks

解放済みコンテンツ

---

id

uuid

PK

---

user_id

uuid

FK users

---

content_type

text

land

weed

philosophy

---

content_id

uuid

---

unlocked_at

timestamp

---

# Relationships

users

↓

user_progress

---

users

↓

user_answers

↓

land_cards

---

land_cards

↓

weed_cards

---

land_cards

↓

philosophy_cards

---

weed_cards

↓

philosophy_cards

---

# MVP Tables

Version 0.1

最初に実装するのは以下のみ

* users
* land_cards
* user_answers
* user_progress

---

# Phase 2 Tables

追加

* weed_cards

---

# Phase 3 Tables

追加

* philosophy_cards

---

# Phase 4 Tables

追加

* user_unlocks

---

# Design Principles

正解データを持たない

---

推奨回答を持つ

---

観察を促す

---

知識の暗記を目的にしない

---

土地カードを中心に全コンテンツを接続する

---

Land Card is the Core Domain
