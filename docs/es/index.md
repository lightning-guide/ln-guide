# Introducción

<div class="lightning-intro">

## ¿Qué es Lightning Network?

<div class="intro-card">
Lightning es un protocolo de “capa 2” para pagos rápidos. Opera fuera de cadena mediante cooperación entre pares y recurre a transacciones on-chain para hacer cumplir el estado si es necesario.

Aunque Lightning Network puede implementarse sobre distintas blockchains, en esta guía nos enfocaremos exclusivamente en su uso sobre la red de Bitcoin.
</div>

## Concepto básico

<div class="intro-card">

Lightning Network funciona como una capa paralela a Bitcoin: corre con sus propios nodos y software, pero se coordina con la cadena base mediante transacciones específicas. Esas transacciones “de entrada y salida” son las que conectan el mundo off‑chain con la blockchain.

Para operar en Lightning, dos personas crean un contrato entre ellas que actúa como una cuenta bancaria compartida. Ahí registran actualizaciones de saldo que solo conocen los participantes, y que están protegidas por mecanismos criptográficos que impiden que alguno modifique el historial a su favor.

A esa cuenta compartida la llamamos **canal**.

Cuando dos participantes abren un canal, pueden transferirse bitcoin entre sí cuantas veces deseen sin ejecutar transacciones en la cadena principal. Cada envío simplemente actualiza la distribución interna del saldo del canal (el reparto que le corresponde a cada uno) y queda protegido por firmas válidas de ambos.

Cuando cualquiera de los dos desee obtener los fondos que le corresponden nuevamente en la cadena principal, debe cerrar el canal. Esto consiste en publicar en la blockchain el último estado firmado del canal, que liquida los fondos y asigna a cada uno lo que le corresponde. 

_En las próximas secciones exploraremos estos procesos con mayor profundidad._

</div>

## Unidad de cuenta: Satoshis

<div class="intro-card">

En Lightning Network, todas las transacciones y balances se expresan en **satoshis**. Esta es la forma estándar de trabajar en la red Lightning.

**¿Qué es un satoshi?**

Un satoshi es la unidad más pequeña de Bitcoin, nombrada en honor a Satoshi Nakamoto. La equivalencia es simple: **1 Bitcoin = 100,000,000 satoshis** (100 millones de satoshis).

<div class="equivalences-grid">

**Equivalencias:**
- 0.00000001 BTC = **1 sat**
- 0.000001 BTC = **100 sats**  
- 0.001 BTC = **100K sats**
- 1 BTC = **100M sats**

</div>

Al trabajar con satoshis, Lightning Network habilita:

- **Micropagos:** Puedes enviar desde 1 satoshi (0.00000001 BTC), algo imposible en la red principal de Bitcoin.
- **Precisión:** Mayor divisibilidad en los pagos.
- **Nuevos modelos de negocio:** Pagos por segundo, por minuto, por uso, etc.

Esta granularidad permite que Lightning Network sea verdaderamente útil para pagos cotidianos, desde comprar un café hasta pagar por contenido digital por segundo, algo que nunca antes había sido posible con Bitcoin.

</div>

## Beneficios Principales

### 🌐 Escalabilidad

<div class="benefit-card">
Los bloques de Bitcoin se crean cada 10 minutos con espacio limitado. Cuando hay mucha demanda, las comisiones pueden superar los $10-60 USD, haciendo imposible pagos pequeños.

Con Lightning Network, pagas una comisión para abrir y cerrar el canal, pero puedes realizar miles de transacciones gratuitas mientras tengas el canal abierto.
</div>

### 💰 Micropagos

<div class="benefit-card">
En la red principal, lo mínimo razonable a enviar suele rondar los ~0.000006 BTC (para que la transferencia justifique el pago de la comisiòn de la red). Lightning Network permite transacciones desde 1 satoshi (0.00000001 BTC) y prácticamente sin comisiones.
</div>

### 🔒 Privacidad

<div class="benefit-card">
Los canales pueden ser privados. Solo las partes involucradas saben qué transacciones ocurren dentro.

A través de la red interconectada, es difícil rastrear el destino final de los pagos una vez cerrado el canal.
</div>

### ⚡ Velocidad

<div class="benefit-card">
Las transacciones de Lightning son rápidas como un relámpago. No hay que esperar confirmaciones de bloque.

Los pagos se pueden realizar tan rápido como lo permita tu conexión a Internet.
</div>


_En la siguiente sección exploraremos el funcionamiento de la red._

</div>