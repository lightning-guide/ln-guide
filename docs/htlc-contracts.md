# HTLC Contracts in Lightning Network

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
