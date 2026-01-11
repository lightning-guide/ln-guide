---
title: BOLT Standards - Lightning Network Technical Specifications Explained
description: Complete guide to BOLT standards (Basis of Lightning Technology). Learn about BOLT 1-12 specifications including messaging, channels, transactions, onion routing, and invoices.
head:
  - - meta
    - name: description
      content: Complete guide to BOLT standards (Basis of Lightning Technology). Learn about BOLT 1-12 specifications including messaging, channels, transactions, onion routing, and invoices.
  - - meta
    - name: keywords
      content: BOLT standards, lightning specifications, BOLT 11 invoice, BOLT 12 offers, lightning protocol, LND, Core Lightning, Eclair, lightning interoperability
  - - meta
    - property: og:title
      content: BOLT Standards - Lightning Network Specifications
  - - meta
    - property: og:description
      content: Complete guide to BOLT standards. Learn about BOLT 1-12 specifications including messaging, channels, routing, and invoices.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:title
      content: BOLT Standards - Lightning Network Specifications
  - - meta
    - name: twitter:description
      content: Complete guide to BOLT standards. Learn about BOLT 1-12 specifications including messaging, channels, routing, and invoices.
---

# BOLT Standards

<p class="subtitle">Lightning Network Technical Specifications</p>

<div class="lightning-intro">

## What does BOLT mean?

<div class="intro-card">

**BOLT** means **"Basis of Lightning Technology"**. It is the set of technical specifications that define how Lightning Network works in a standard and interoperable way.

BOLTs are technical documents that establish the protocols, message formats, and procedures that all Lightning nodes must follow to communicate with each other. Without these standards, each Lightning implementation would be incompatible with the others.

</div>

## Complete list of BOLT specifications

<div class="intro-card bolt-spec">

### BOLT 1: Base Protocol

**Description:** Defines the fundamentals of the Lightning protocol, including connection establishment, message types, and the communication format between nodes.

**Purpose:** Establishes the foundation upon which all other BOLT specifications are built.

🔗 [View BOLT 1 on GitHub](https://github.com/lightning/bolts/blob/master/01-messaging.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 2: Peer Protocol for Channel Management

**Description:** Specifies how nodes establish and manage payment channels between peers.

**Purpose:** Defines the protocol for opening, closing, and maintaining payment channels securely.

🔗 [View BOLT 2 on GitHub](https://github.com/lightning/bolts/blob/master/02-peer-protocol.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 3: Bitcoin Transaction and Script Formats

**Description:** Defines the Bitcoin transaction and script formats used in Lightning Network.

**Purpose:** Establishes how on-chain transactions that support Lightning channels are structured.

🔗 [View BOLT 3 on GitHub](https://github.com/lightning/bolts/blob/master/03-transactions.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 4: Onion Routing Protocol

**Description:** Specifies the onion routing protocol that allows sending payments through multiple nodes.

**Purpose:** Allows payments to travel through the network without revealing the complete route, improving privacy.

🔗 [View BOLT 4 on GitHub](https://github.com/lightning/bolts/blob/master/04-onion-routing.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 5: Recommendations for On-chain Transaction Handling

**Description:** Provides recommendations for handling on-chain transactions in Lightning Network.

**Purpose:** Establishes best practices for managing transactions on the Bitcoin blockchain.

🔗 [View BOLT 5 on GitHub](https://github.com/lightning/bolts/blob/master/05-onchain.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 7: P2P Node and Channel Discovery

**Description:** Defines how nodes discover other nodes and channels on the Lightning network.

**Purpose:** Allows nodes to find payment routes and connect with each other.

🔗 [View BOLT 7 on GitHub](https://github.com/lightning/bolts/blob/master/07-routing-gossip.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 8: Encrypted and Authenticated Transport

**Description:** Specifies the encrypted and authenticated transport protocol between Lightning nodes.

**Purpose:** Ensures that all communications between nodes are secure and private.

🔗 [View BOLT 8 on GitHub](https://github.com/lightning/bolts/blob/master/08-transport.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 9: Assigned Feature Flags

**Description:** Defines the assigned feature flags for different protocol functionalities.

**Purpose:** Allows nodes to negotiate which features they mutually support.

🔗 [View BOLT 9 on GitHub](https://github.com/lightning/bolts/blob/master/09-features.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 10: DNS Bootstrap and Assisted Node Location

**Description:** Specifies how nodes can discover each other using DNS and other assisted location methods.

**Purpose:** Facilitates the bootstrap process for new nodes on the network.

🔗 [View BOLT 10 on GitHub](https://github.com/lightning/bolts/blob/master/10-dns-bootstrap.md)

</div>

<div class="intro-card bolt-spec bolt-special">

### BOLT 11: Invoice Protocol for Lightning Payments

**Description:** Defines the invoice format used to request payments on Lightning Network.

**Purpose:** Establishes a standard for creating and processing payment requests in an interoperable way.

🔗 [View BOLT 11 on GitHub](https://github.com/lightning/bolts/blob/master/11-payment-encoding.md)

<div class="bolt-note">
**Important note:** BOLT 11 is fundamental for Lightning Network operation. In a specific section we will explore in detail how Lightning invoices work, their structure, and how payments are processed.
</div>

</div>

<div class="intro-card bolt-spec">

### BOLT 12: Offers Protocol

**Description:** Defines the offers protocol that allows creating more flexible payment requests than BOLT 11 invoices.

**Purpose:** Allows creating payment offers that can be modified and reused.

🔗 [View BOLT 12 on GitHub](https://github.com/lightning/bolts/blob/master/12-offer-encoding.md)

</div>

## Importance of BOLT standards

<div class="intro-card">

BOLT standards are essential for Lightning Network because:

- **Interoperability:** They allow different Lightning implementations (such as LND, Core Lightning, Eclair) to work together.
- **Security:** They establish proven cryptographic and security protocols.
- **Innovation:** They provide a solid foundation upon which to build new functionalities.
- **Adoption:** They facilitate adoption by having clear and documented specifications.

Each BOLT is maintained by the Lightning community and can evolve over time to include new features and security improvements.

</div>

</div>
