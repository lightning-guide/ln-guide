---
title: Contratos HTLC - Hash Time-Locked Contracts en Lightning Network
description: Aprende cómo funcionan los HTLC (Hash Time-Locked Contracts) en Lightning Network. Entiende hashlock, timelock, preimágenes y cómo los HTLC permiten pagos enrutados sin confianza.
head:
  - - meta
    - name: description
      content: Aprende cómo funcionan los HTLC (Hash Time-Locked Contracts) en Lightning Network. Entiende hashlock, timelock, preimágenes y cómo los HTLC permiten pagos enrutados sin confianza.
  - - meta
    - name: keywords
      content: HTLC, contratos hash time-locked, lightning HTLC, hashlock, timelock, preimagen, seguridad enrutamiento lightning, pagos sin confianza, pagos condicionales
  - - meta
    - property: og:title
      content: Contratos HTLC - Seguridad en Lightning Network
  - - meta
    - property: og:description
      content: Aprende cómo funcionan los HTLC en Lightning Network. Entiende hashlock, timelock y pagos enrutados sin confianza.
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:title
      content: Contratos HTLC - Seguridad en Lightning Network
  - - meta
    - name: twitter:description
      content: Aprende cómo funcionan los HTLC en Lightning Network. Entiende hashlock, timelock y pagos enrutados sin confianza.
---

# Contratos HTLC

<p class="subtitle">Base de Seguridad en Lightning Network</p>

<div class="lightning-intro">

## ¿Qué es un HTLC?

<div class="intro-card">

Un Contrato de Bloqueo por Tiempo con Hash (HTLC) es un mecanismo que permite pagos condicionados en Lightning Network. Requiere presentar la preimagen de un hash antes de una fecha límite; de lo contrario, el pago se revierte.

</div>

## Componentes clave

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/30">
    <h3 class="text-xl font-semibold text-neutral-100 mb-4">Hash y Preimagen</h3>
    <p class="text-neutral-200">El receptor genera una preimagen secreta y comparte su hash. El pagador bloquea los fondos con ese hash.</p>
  </div>
  <div class="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/30">
    <h3 class="text-xl font-semibold text-neutral-100 mb-4">Bloqueo por Tiempo</h3>
    <p class="text-neutral-200">Si el receptor no revela la preimagen a tiempo, el pago caduca y los fondos regresan al emisor.</p>
  </div>
</div>

## ¿Cómo habilitan los pagos enrutados?

<div class="intro-card">

Los HTLC permiten que los pagos atraviesen múltiples nodos sin confianza directa entre emisor y receptor. Cada salto ve solo el hash y condiciones temporales, manteniendo la seguridad y privacidad.

</div>

</div>
