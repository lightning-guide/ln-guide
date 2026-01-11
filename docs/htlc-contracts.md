---
title: HTLC Contracts - Hash Time-Locked Contracts in Lightning Network
description: Learn how HTLC (Hash Time-Locked Contracts) work in Lightning Network. Understand hashlock, timelock, preimages, and how HTLCs enable trustless routed payments across nodes.
head:
  - - meta
    - name: description
      content: Learn how HTLC (Hash Time-Locked Contracts) work in Lightning Network. Understand hashlock, timelock, preimages, and how HTLCs enable trustless routed payments across nodes.
  - - meta
    - name: keywords
      content: HTLC, hash time-locked contracts, lightning HTLC, hashlock, timelock, preimage, lightning routing security, trustless payments, conditional payments
  - - meta
    - property: og:title
      content: HTLC Contracts - Lightning Network Security
  - - meta
    - property: og:description
      content: Learn how HTLC (Hash Time-Locked Contracts) work in Lightning Network. Understand hashlock, timelock, and trustless routed payments.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:title
      content: HTLC Contracts - Lightning Network Security
  - - meta
    - name: twitter:description
      content: Learn how HTLC (Hash Time-Locked Contracts) work in Lightning Network. Understand hashlock, timelock, and trustless routed payments.
---

# HTLC Contracts

<p class="subtitle">Lightning Network's Security Foundation</p>

<div class="lightning-intro">

## What is an HTLC?

<div class="intro-card">

A Hash Timelock Contract (HTLC) is a mechanism that allows conditional payments in Lightning Network. It requires presenting the preimage of a hash before a deadline; otherwise, the payment is reverted.

</div>

## Key components

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/30">
    <h3 class="text-xl font-semibold text-neutral-100 mb-4">Hash and Preimage</h3>
    <p class="text-neutral-200">The receiver generates a secret preimage and shares its hash. The payer locks the funds with that hash.</p>
  </div>
  <div class="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/30">
    <h3 class="text-xl font-semibold text-neutral-100 mb-4">Time Lock</h3>
    <p class="text-neutral-200">If the receiver doesn't reveal the preimage on time, the payment expires and the funds return to the sender.</p>
  </div>
</div>

## How do they enable routed payments?

<div class="intro-card">

HTLCs allow payments to traverse multiple nodes without direct trust between sender and receiver. Each hop only sees the hash and temporal conditions, maintaining security and privacy.

</div>

</div>
