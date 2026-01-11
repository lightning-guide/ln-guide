---
title: Lightning Network Guide - Complete Bitcoin Layer 2 Tutorial
description: Master the Lightning Network with our comprehensive beginner guide. Learn payment channels, instant Bitcoin transactions, micropayments, and how to scale Bitcoin effectively.
head:
  - - meta
    - name: description
      content: Master the Lightning Network with our comprehensive beginner guide. Learn payment channels, instant Bitcoin transactions, micropayments, and how to scale Bitcoin effectively.
  - - meta
    - name: keywords
      content: lightning network, bitcoin layer 2, payment channels, bitcoin scaling, micropayments, instant bitcoin payments, lightning guide, LN tutorial
  - - meta
    - property: og:title
      content: Lightning Network Guide - Complete Bitcoin Layer 2 Tutorial
  - - meta
    - property: og:description
      content: Master the Lightning Network with our comprehensive beginner guide. Learn payment channels, instant Bitcoin transactions, and micropayments.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:title
      content: Lightning Network Guide - Complete Bitcoin Layer 2 Tutorial
  - - meta
    - name: twitter:description
      content: Master the Lightning Network with our comprehensive beginner guide. Learn payment channels, instant Bitcoin transactions, and micropayments.
---

# Lightning Network

<p class="subtitle">The Complete Beginner's Guide</p>

<div class="lightning-intro">

## What is Lightning Network?

<div class="intro-card">
Lightning is a "layer 2" protocol for fast payments. It operates off-chain through peer cooperation and resorts to on-chain transactions to enforce state if necessary.

Although Lightning Network can be implemented on different blockchains, in this guide we will focus exclusively on its use on the Bitcoin network.
</div>

## Basic concept

<div class="intro-card">

Lightning Network works as a parallel layer to Bitcoin: it runs with its own nodes and software, but coordinates with the base chain through specific transactions. Those "entry and exit" transactions are what connect the off-chain world with the blockchain.

To operate on Lightning, two people create a contract between them that acts as a shared bank account. There they record balance updates that only the participants know, and which are protected by cryptographic mechanisms that prevent either from modifying the history in their favor.

We call that shared account a **channel**.

When two participants open a channel, they can transfer bitcoin to each other as many times as they want without executing transactions on the main chain. Each send simply updates the internal distribution of the channel balance (the share that corresponds to each one) and is protected by valid signatures from both.

When either of the two wants to get their corresponding funds back on the main chain, they must close the channel. This consists of publishing the last signed state of the channel on the blockchain, which liquidates the funds and assigns to each what corresponds to them.

_In the next sections we will explore these processes in greater depth._

</div>

## Unit of account: Satoshis

<div class="intro-card">

In Lightning Network, all transactions and balances are expressed in **satoshis**. This is the standard way of working on the Lightning network.

**What is a satoshi?**

A satoshi is the smallest unit of Bitcoin, named in honor of Satoshi Nakamoto. The equivalence is simple: **1 Bitcoin = 100,000,000 satoshis** (100 million satoshis).

<div class="equivalences-grid">

**Equivalences:**
- 0.00000001 BTC = **1 sat**
- 0.000001 BTC = **100 sats**  
- 0.001 BTC = **100K sats**
- 1 BTC = **100M sats**

</div>

When working with satoshis, Lightning Network enables:

- **Micropayments:** You can send from 1 satoshi (0.00000001 BTC), something impossible on the main Bitcoin network.
- **Precision:** Greater divisibility in payments.
- **New business models:** Payments per second, per minute, per use, etc.

This granularity allows Lightning Network to be truly useful for everyday payments, from buying a coffee to paying for digital content per second, something that had never been possible before with Bitcoin.

</div>

## Main Benefits

### 🌐 Scalability

<div class="benefit-card">
Bitcoin blocks are created every 10 minutes with limited space. When there is high demand, fees can exceed $10-60 USD, making small payments impossible.

With Lightning Network, you pay a fee to open and close the channel, but you can make thousands of free transactions while the channel is open.
</div>

### 💰 Micropayments

<div class="benefit-card">
On the main network, the minimum reasonable amount to send is usually around ~0.000006 BTC (for the transfer to justify paying the network fee). Lightning Network allows transactions from 1 satoshi (0.00000001 BTC) and practically without fees.
</div>

### 🔒 Privacy

<div class="benefit-card">
Channels can be private. Only the parties involved know what transactions occur within.

Through the interconnected network, it is difficult to trace the final destination of payments once the channel is closed.
</div>

### ⚡ Speed

<div class="benefit-card">
Lightning transactions are fast as lightning. There's no need to wait for block confirmations.

Payments can be made as fast as your internet connection allows.
</div>


_In the next section we will explore how the network works._

</div>