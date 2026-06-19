# Imaging Agriculture Architecture

## Purpose

土地を読む力を育てるアプリを構築する。

MVPでは

「土地を見る → 考える → 学ぶ」

のループのみ実装する。

---

# System Overview

User

↓

Home

↓

Question

↓

Result

↓

Profile

---

# Frontend

Next.js

TypeScript

Tailwind

shadcn/ui

---

# Backend

Supabase

---

# Analytics

PostHog

---

# Error Monitoring

Sentry

---

# Core Domain

## LandCard

土地学習コンテンツ

### Fields

id

title

image_url

question

choices

correct_answer

explanation

difficulty

xp_reward

knowledge_links

---

## UserProgress

ユーザー進捗

### Fields

user_id

level

xp

streak_days

cards_completed

---

## KnowledgeCard

知識カード

### Fields

id

title

category

summary

body

related_cards

---

# User Flow

Home

↓

土地カード表示

↓

回答

↓

解説表示

↓

XP付与

↓

次のカード

---

# Non Goals

MVPでは作らない

* SNS
* コメント
* フォロー
* DM
* 農地売買
* AI画像認識
* AI土地診断

---

# Product Principles

知識を教えない

観察を促す

---

正解を押し付けない

考えるきっかけを作る

---

土地を見る回数を増やす

---

# North Star

Land Reading Sessions
