# How Payment Channels Work

<div class="lightning-intro">

## Why do you need channels?

<div class="intro-card">

When you set up your Lightning Network node, you need to open payment channels to be able to send and receive transfers on the network. Channels are the connections that allow you to interact with other Lightning Network participants.

Without open channels, your node cannot perform transactions. It's like having a bank account without connection to the banking network: you have the money, but you can't transfer it to other users. Channels are those connections that allow you to move satoshis instantly and economically.

Each channel you open connects you with a specific node, and through that connection you can send payments not only to that node, but also to any other node on the Lightning network, as long as there is a route of connected channels between your node and the destination.

</div>

## Opening a channel

<div class="intro-card">

To open a payment channel, each node must have available balance in their Bitcoin wallet. This wallet is used both to deposit funds into the channel and to sign all transactions related to the channel during its lifetime.

The opening process follows these steps:

- Two users, for example Alice and Bob, agree to open a channel between them and decide how many sats each will deposit from their respective wallets.
- A 2-of-2 multisig address is generated that will require both signatures to move the funds.
- One of the two users (or both) deposit their funds in the multisig address through a transaction on the Bitcoin blockchain, using their wallet private keys to sign the transaction.
- Once the transaction is confirmed, the channel is established with a total capacity equal to the sum of the deposits.

<div class="w-full flex justify-center">
  <ChannelOpeningDemo />
</div>

As we see in the animation, when Alice and Bob open a channel, each deposits 500,000 sats in the multisig address, creating a channel with total capacity of 1,000,000 sats. Once established, they can perform transactions between them by updating the channel balances. For example, when Alice sends 100,000 sats to Bob, her balance decreases to 400,000 while Bob's increases to 600,000 sats.

</div>

## Channel updates

<div class="intro-card">

Each time participants want to perform a transaction, they must agree and sign a new channel state. This process is fundamental to maintain the security and integrity of funds in the channel.

### How does the update process work?

When Alice wants to send 100,000 sats to Bob, the process follows these steps:

- **New state proposal:** Alice proposes a new channel state that reflects the desired transfer, showing how the balances would change.
- **Bilateral signature:** Both participants must sign this new state for it to be valid. This ensures that both agree with the transaction.
- **Capacity update:** Once signed by both, this state is saved as the last valid state of the channel and capacities are automatically updated.
- **Local storage:** This new signed state is stored locally on both nodes and is not transmitted to the blockchain, making updates instantaneous.
- **Final state:** If the channel is closed in the future, this signed state will determine how many funds each participant receives.

You can see this process in action below:

<div class="w-full flex justify-center">
  <ChannelUpdateDemo />
</div>

</div>

## Channel security

<div class="intro-card">

The security of funds is guaranteed by several mechanisms:

- The multisig address requires both participants' signatures to move the funds.
- Each channel update includes penalties if someone tries to cheat by using a previous state.
- Any participant can close the channel at any time and claim their funds according to the last agreed state.

</div>

<div class="intro-card">

### Ready to explore more?

Learn about channel capacity and how this affects transactions on Lightning Network.

[Next: Channel Capacity](/capacity)

</div>

</div>


