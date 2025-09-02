# Contratos HTLC en Lightning Network

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
