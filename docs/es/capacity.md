# Capacidad de los canales en Lightning Network

<div class="lightning-intro">

## ¿Qué es la capacidad de un canal?

<div class="intro-card">

La capacidad de un canal en Lightning Network es la cantidad total de satoshis depositados en ese canal por los participantes al abrirlo. Esta capacidad determina cuánto puedes enviar o recibir a través del canal.
</div>

## Tipos de capacidad

<div class="intro-card">

Cada nodo en un canal tiene dos tipos de capacidad: **capacidad de envío** y **capacidad de recepción**. Estas capacidades se complementan entre los dos nodos del canal.

### **Capacidad de Envío**

Es la cantidad de satoshis que tienes disponibles para enviar a través del canal. También se conoce como "balance local".

### **Capacidad de Recepción**

Es la cantidad de satoshis que puedes recibir a través del canal. También se conoce como "balance remoto".

### Ejemplo práctico

Si Alice tiene 300,000 sats en su lado del canal y Bob tiene 700,000 sats:

- **Alice** puede enviar hasta 300,000 sats a Bob, y puede recibir hasta 700,000 sats de Bob
- **Bob** puede enviar hasta 700,000 sats a Alice, y puede recibir hasta 300,000 sats de Alice

Las capacidades de envío y recepción siempre suman el total de satoshis depositados en el canal.

</div>

## Gestión de la capacidad

<div class="intro-card">

A medida que realizas transacciones, la capacidad de tu canal se desequilibra. Si envías muchos pagos en una dirección, eventualmente agotarás tu capacidad de envío y necesitarás estrategias para reequilibrar el canal.

### Estrategias de reequilibrio

- **Reequilibrio circular:** Enviarte pagos a ti mismo de un canal a otro para mover liquidez entre canales.
- **Intercambio submarino:** Usar servicios que permiten drenar o llenar un canal existente por una pequeña tarifa.
- **Apertura de canales entrantes:** Pedir a otros que abran canales hacia ti.
- **Gastar fondos:** Realizar pagos para mover satoshis al otro lado del canal.

</div>

## Liquidez entrante

<div class="intro-card">

Cuando abres un canal unilateralmente hacia otra persona, todos los fondos inicialmente están en tu lado. Esto significa que solo puedes enviar pagos, no recibir. Para poder recibir pagos, necesitas liquidez entrante.

### Cómo obtener liquidez entrante

- **Canales entrantes:** Pedir a otros que abran canales hacia ti. Algunas empresas como LN Big corresponderán automáticamente.
- **Servicios de liquidez:** Comprar liquidez entrante de servicios como Lightning Pool.
- **Intercambio submarino:** Usar servicios que intercambian liquidez entre canales.
- **Billeteras automáticas:** Algunas billeteras como Breez y Phoenix abren canales automáticamente según sea necesario.

</div>

## Problemas comunes con la capacidad

<div class="intro-card">

### **Capacidad insuficiente**

Si intentas enviar más satoshis de los que tienes disponibles en tu capacidad de envío, el pago fallará.

*Solución:* Reequilibrar tu canal o usar MPP para dividir el pago.

### **Problemas de enrutamiento**

Al enviar pagos a través de la red, cada canal en la ruta debe tener suficiente capacidad para manejar el monto del pago.

*Solución:* El nodo automáticamente buscará rutas alternativas o dividirá el pago usando MPP.

</div>

## Tamaño del canal y MPP

<div class="intro-card">

Si tienes un canal de 1,000,000 sats y necesitas enviar 1,500,000 sats, no podrás hacerlo con un solo canal. Aquí es donde entran los **Pagos de Múltiples Rutas (MPP)**.

MPP permite usar múltiples canales controlados por un solo usuario para enrutar una transacción. Por ejemplo, podrías enviar 800,000 sats por un canal y 700,000 sats por otro canal para completar el pago de 1,500,000 sats.

Esta funcionalidad se está convirtiendo rápidamente en estándar y mejora enormemente la experiencia del usuario y las tasas de éxito de los pagos.

*Más adelante exploraremos MPP en detalle y cómo funciona en la práctica.*

</div>

<div class="intro-card">

### ¿Listo para explorar más?

Aprende cómo se cierran los canales de pago y qué sucede con los fondos cuando esto ocurre.

 [Siguiente: Cierre de Canales](/channel-closure)

</div>

</div>


