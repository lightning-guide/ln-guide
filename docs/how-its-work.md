# How Lightning Network Works

<div class="lightning-intro">

## Interconnected nodes

<div class="intro-card">

Lightning Network is a network of nodes that operate on top of Bitcoin. A **Lightning node** is software that handles communication between other Lightning nodes and the Bitcoin blockchain.

### How does a Lightning node work?

Each Lightning node has two main functions:

- **Connect to Bitcoin:** It needs to connect to a Bitcoin node to interact with the blockchain, whether to open channels, close them, or resolve disputes.
- **Connect to other Lightning nodes:** It communicates with other Lightning nodes through a P2P (peer-to-peer) network to send and receive payments.

Each node in the network has its own Bitcoin wallet with its unique mnemonic phrase (12/24 words). To connect with other nodes, they use **payment channels**, which are shared multisig accounts between two nodes' wallets to exchange satoshis between them.

In essence, Lightning is a network built from bilateral channels: each channel links exactly two participants (two nodes) and defines how much balance can be moved in each direction. From these point-to-point links, a mesh is formed where payments can traverse several hops to their destination. There are no channels between "many" people at once; composition occurs by chaining multiple 2-of-2 channels, which simplifies security and allows capacity and connectivity to emerge from local agreements between peers.

<NetworkDemo />

This network of interconnected channels forms a giant mesh where any user can send payments to any other, even if they don't have a direct channel, through routes that connect multiple channels.

</div>

## Payment channels

<div class="intro-card">

**Payment channels** are the fundamental basis of Lightning Network. They are like "shared bank accounts" between two nodes that allow them to exchange satoshis instantly without needing to wait for Bitcoin blockchain confirmations.

These shared accounts are possible thanks to **multisig addresses**. A multisig address is one from which multiple private keys can make expenditures. When creating an address, you specify how many private keys can spend the funds and how many of those keys are required to sign a transaction.

To initiate a Lightning channel, participants lock funds in a **2-of-2** scheme. There are only two private keys capable of signing, and both are necessary to move coins. This ensures that no participant can steal the other's funds.

> 💡 **Practical example**
>
> If Alice and Bob open a channel, both deposit funds in a 2-of-2 multisig address. Bob won't be able to withdraw funds without Alice's approval, and vice versa. This creates a trust environment where both are protected.
>
> For example, if Alice and Bob open a channel with 500,000 sats each, the channel will have a total capacity of 1,000,000 sats. Both can exchange satoshis instantly within this limit.

<ChannelDemo />

### How does the exchange work?

Once the channel is open, participants can:

- **Transfer instantly:** They can send satoshis between them in milliseconds as many times as they want without needing to wait for confirmations. Payments are processed locally between the two nodes.
- **Close the channel:** When the two parties decide to finalize it, they publish the last state signed by both on the Bitcoin blockchain. The network only records a single transaction on the chain that "liquidates" all exchanges made within the channel. That final state determines precisely how many satoshis each participant receives in their wallet, according to the capacities each side had at the time of closure.

_In the next section we will explore payment channels and their technical characteristics in more detail._

</div>

## Payment routing

<div class="intro-card">

Routing allows sending payments between nodes that don't have a direct channel. For example, if Alice wants to pay Carol but doesn't have a channel with her, she can send the payment through Bob, who has channels with both. Channel balances are automatically updated to reflect the transfer, maintaining the security and privacy of the transaction.

<RoutingDemo />

</div>

## Hash Timelock Contracts (HTLC)

<div class="intro-card">

**Hash Timelock Contracts (HTLC)** are the security mechanism that makes the entire Lightning network work reliably. They are smart contracts that execute on layer 1 (main Bitcoin network) and ensure that payments on Lightning Network are secure and trustless between parties.

### Why are they important?

HTLCs combine two fundamental technologies to create a secure payment system:

#### **Hashlock**

Ensures that funds are only released when a specific secret is provided, creating secure conditional payments.

#### **Timelock**

Allows funds to be recovered after a determined time if the other party doesn't cooperate, protecting against malicious behavior.

> 🔒 **Guaranteed security**
>
> Thanks to HTLCs, Lightning Network can function without trust between parties. Each payment is backed by the security of the Bitcoin blockchain, ensuring that no one can steal funds without cooperation.

_In a later section we will explore in detail how HTLCs work and their practical applications._

</div>

## Conclusion

<div class="intro-card">

- **Nodes:** Connection points that manage payments on the network.
- **Payment channels:** Private paths where transactions flow, based on 2-of-2 multisig addresses.
- **HTLC:** Security mechanism that ensures payment integrity and allows funds to be recovered if necessary.
- **Routing:** Mechanism that allows sending payments through multiple nodes without losing security.

Lightning Network offers an efficient and economical way to perform Bitcoin transactions by allowing payments off the main chain. Through nodes, payment channels, and HTLCs, users can send and receive funds quickly, while routing ensures that transactions can flow through the network securely and without trusted intermediaries.

</div>

<div class="intro-card">

### Ready to dive deeper?

Learn more about payment channels in Lightning Network in the next step.

[Next: Channels](/channels)

</div>

</div>


