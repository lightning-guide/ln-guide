# Estándar BOLT

<div class="lightning-intro">

## ¿Qué significa BOLT?

<div class="intro-card">

**BOLT** significa **"Basis of Lightning Technology"** (Base de la Tecnología Lightning). Es el conjunto de especificaciones técnicas que definen cómo funciona Lightning Network de manera estándar e interoperable.

Los BOLTs son documentos técnicos que establecen los protocolos, formatos de mensajes, y procedimientos que todos los nodos Lightning deben seguir para poder comunicarse entre sí. Sin estos estándares, cada implementación de Lightning sería incompatible con las demás.

</div>

## Lista completa de especificaciones BOLT

<div class="intro-card bolt-spec">

### BOLT 1: Base Protocol

**Descripción:** Define los fundamentos del protocolo Lightning, incluyendo el establecimiento de conexiones, tipos de mensajes, y el formato de comunicación entre nodos.

**Propósito:** Establece la base sobre la cual se construyen todas las demás especificaciones BOLT.

🔗 [Ver BOLT 1 en GitHub](https://github.com/lightning/bolts/blob/master/01-messaging.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 2: Peer Protocol for Channel Management

**Descripción:** Especifica cómo los nodos establecen y gestionan canales de pago entre pares.

**Propósito:** Define el protocolo para abrir, cerrar, y mantener canales de pago de manera segura.

🔗 [Ver BOLT 2 en GitHub](https://github.com/lightning/bolts/blob/master/02-peer-protocol.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 3: Bitcoin Transaction and Script Formats

**Descripción:** Define los formatos de transacciones Bitcoin y scripts utilizados en Lightning Network.

**Propósito:** Establece cómo se estructuran las transacciones on-chain que respaldan los canales Lightning.

🔗 [Ver BOLT 3 en GitHub](https://github.com/lightning/bolts/blob/master/03-transactions.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 4: Onion Routing Protocol

**Descripción:** Especifica el protocolo de enrutamiento cebolla que permite el envío de pagos a través de múltiples nodos.

**Propósito:** Permite que los pagos viajen a través de la red sin revelar la ruta completa, mejorando la privacidad.

🔗 [Ver BOLT 4 en GitHub](https://github.com/lightning/bolts/blob/master/04-onion-routing.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 5: Recommendations for On-chain Transaction Handling

**Descripción:** Proporciona recomendaciones para el manejo de transacciones on-chain en Lightning Network.

**Propósito:** Establece mejores prácticas para la gestión de transacciones en la blockchain de Bitcoin.

🔗 [Ver BOLT 5 en GitHub](https://github.com/lightning/bolts/blob/master/05-onchain.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 7: P2P Node and Channel Discovery

**Descripción:** Define cómo los nodos descubren otros nodos y canales en la red Lightning.

**Propósito:** Permite que los nodos encuentren rutas de pago y se conecten entre sí.

🔗 [Ver BOLT 7 en GitHub](https://github.com/lightning/bolts/blob/master/07-routing-gossip.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 8: Encrypted and Authenticated Transport

**Descripción:** Especifica el protocolo de transporte encriptado y autenticado entre nodos Lightning.

**Propósito:** Garantiza que todas las comunicaciones entre nodos sean seguras y privadas.

🔗 [Ver BOLT 8 en GitHub](https://github.com/lightning/bolts/blob/master/08-transport.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 9: Assigned Feature Flags

**Descripción:** Define los flags de características asignados para diferentes funcionalidades del protocolo.

**Propósito:** Permite que los nodos negocien qué características soportan mutuamente.

🔗 [Ver BOLT 9 en GitHub](https://github.com/lightning/bolts/blob/master/09-features.md)

</div>

<div class="intro-card bolt-spec">

### BOLT 10: DNS Bootstrap and Assisted Node Location

**Descripción:** Especifica cómo los nodos pueden descubrirse usando DNS y otros métodos de localización asistida.

**Propósito:** Facilita el proceso de bootstrap para nuevos nodos en la red.

🔗 [Ver BOLT 10 en GitHub](https://github.com/lightning/bolts/blob/master/10-dns-bootstrap.md)

</div>

<div class="intro-card bolt-spec bolt-special">

### BOLT 11: Invoice Protocol for Lightning Payments

**Descripción:** Define el formato de facturas (invoices) utilizadas para solicitar pagos en Lightning Network.

**Propósito:** Establece un estándar para crear y procesar solicitudes de pago de manera interoperable.

🔗 [Ver BOLT 11 en GitHub](https://github.com/lightning/bolts/blob/master/11-payment-encoding.md)

<div class="bolt-note">
**Nota importante:** BOLT 11 es fundamental para el funcionamiento de Lightning Network. En una sección específica exploraremos en detalle cómo funcionan las facturas Lightning, su estructura, y cómo se procesan los pagos.
</div>

</div>

<div class="intro-card bolt-spec">

### BOLT 12: Offers Protocol

**Descripción:** Define el protocolo de ofertas que permite crear solicitudes de pago más flexibles que las facturas BOLT 11.

**Propósito:** Permite crear ofertas de pago que pueden ser modificadas y reutilizadas.

🔗 [Ver BOLT 12 en GitHub](https://github.com/lightning/bolts/blob/master/12-offer-encoding.md)

</div>

## Importancia de los estándares BOLT

<div class="intro-card">

Los estándares BOLT son esenciales para Lightning Network porque:

- **Interoperabilidad:** Permiten que diferentes implementaciones de Lightning (como LND, Core Lightning, Eclair) funcionen juntas.
- **Seguridad:** Establecen protocolos criptográficos y de seguridad probados.
- **Innovación:** Proporcionan una base sólida sobre la cual construir nuevas funcionalidades.
- **Adopción:** Facilitan la adopción al tener especificaciones claras y documentadas.

Cada BOLT es mantenido por la comunidad Lightning y puede evolucionar con el tiempo para incluir nuevas características y mejoras de seguridad.

</div>

</div>
