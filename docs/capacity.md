---
title: Lightning Channel Capacity - Inbound, Outbound & Liquidity Management
description: Understand Lightning Network channel capacity. Learn about inbound and outbound liquidity, sending and receiving capacity, rebalancing strategies, and Multi-Path Payments (MPP).
head:
  - - meta
    - name: description
      content: Understand Lightning Network channel capacity. Learn about inbound and outbound liquidity, sending and receiving capacity, rebalancing strategies, and Multi-Path Payments (MPP).
  - - meta
    - name: keywords
      content: lightning channel capacity, inbound liquidity, outbound liquidity, lightning rebalancing, MPP multi-path payments, channel balance management, lightning liquidity
  - - meta
    - property: og:title
      content: Lightning Channel Capacity - Liquidity Guide
  - - meta
    - property: og:description
      content: Understand Lightning Network channel capacity. Learn about inbound/outbound liquidity, rebalancing strategies, and Multi-Path Payments.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:title
      content: Lightning Channel Capacity - Liquidity Guide
  - - meta
    - name: twitter:description
      content: Understand Lightning Network channel capacity. Learn about inbound/outbound liquidity, rebalancing strategies, and Multi-Path Payments.
---

# Lightning Channel Capacity

<p class="subtitle">Understanding Liquidity</p>

<div class="lightning-intro">

## What is channel capacity?

<div class="intro-card">

Channel capacity in Lightning Network is the total amount of satoshis deposited in that channel by participants when opening it. This capacity determines how much you can send or receive through the channel.
</div>

## Types of capacity

<div class="intro-card">

Each node in a channel has two types of capacity: **sending capacity** and **receiving capacity**. These capacities complement each other between the two nodes in the channel.

### **Sending Capacity**

It is the amount of satoshis you have available to send through the channel. It is also known as "local balance".

### **Receiving Capacity**

It is the amount of satoshis you can receive through the channel. It is also known as "remote balance".

### Practical example

If Alice has 300,000 sats on her side of the channel and Bob has 700,000 sats:

- **Alice** can send up to 300,000 sats to Bob, and can receive up to 700,000 sats from Bob
- **Bob** can send up to 700,000 sats to Alice, and can receive up to 300,000 sats from Alice

Sending and receiving capacities always add up to the total satoshis deposited in the channel.

</div>

## Capacity management

<div class="intro-card">

As you perform transactions, your channel capacity becomes unbalanced. If you send many payments in one direction, you will eventually exhaust your sending capacity and need strategies to rebalance the channel.

### Rebalancing strategies

- **Circular rebalancing:** Sending payments to yourself from one channel to another to move liquidity between channels.
- **Submarine swap:** Using services that allow draining or filling an existing channel for a small fee.
- **Incoming channel opening:** Asking others to open channels towards you.
- **Spending funds:** Making payments to move satoshis to the other side of the channel.

</div>

## Incoming liquidity

<div class="intro-card">

When you unilaterally open a channel towards another person, all funds are initially on your side. This means you can only send payments, not receive. To be able to receive payments, you need incoming liquidity.

### How to get incoming liquidity

- **Incoming channels:** Ask others to open channels towards you. Some companies like LN Big will automatically reciprocate.
- **Liquidity services:** Buy incoming liquidity from services like Lightning Pool.
- **Submarine swap:** Use services that exchange liquidity between channels.
- **Automatic wallets:** Some wallets like Breez and Phoenix automatically open channels as needed.

</div>

## Common capacity problems

<div class="intro-card">

### **Insufficient capacity**

If you try to send more satoshis than you have available in your sending capacity, the payment will fail.

*Solution:* Rebalance your channel or use MPP to split the payment.

### **Routing problems**

When sending payments through the network, each channel in the route must have sufficient capacity to handle the payment amount.

*Solution:* The node will automatically search for alternative routes or split the payment using MPP.

</div>

## Channel size and MPP

<div class="intro-card">

If you have a 1,000,000 sats channel and need to send 1,500,000 sats, you won't be able to do it with a single channel. This is where **Multi-Path Payments (MPP)** come in.

MPP allows using multiple channels controlled by a single user to route a transaction. For example, you could send 800,000 sats through one channel and 700,000 sats through another channel to complete the 1,500,000 sats payment.

This functionality is quickly becoming standard and greatly improves user experience and payment success rates.

*Later we will explore MPP in detail and how it works in practice.*

</div>

<div class="intro-card">

### Ready to explore more?

Learn how payment channels are closed and what happens to funds when this occurs.

[**Next: Channel Closure →**](/channel-closure)

</div>

## Related Topics

<div class="intro-card">

- [Payment Channels](/channels) - How to open and manage channels
- [Channel Closure](/channel-closure) - Closing channels safely
- [HTLC Contracts](/htlc-contracts) - How routing payments work
- [BOLT Standards](/bolt-standards) - Protocol specifications

</div>

</div>


