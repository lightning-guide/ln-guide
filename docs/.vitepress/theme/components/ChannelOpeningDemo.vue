<template>
  <div class="channel-demo-container" ref="containerRef">
    <div class="channel-demo-header">
      <div class="header-spacer"></div>
      <p class="header-text" :key="textAnimationKey" :class="{ 'animate-text-explode': textAnimationKey > 0 }">
        {{ descriptionText }}
      </p>
      <button @click="restartAnimation" class="restart-button" :title="t('channelOpeningDemo.restartButton')">
        <span class="restart-icon">↻</span>
        <svg class="progress-ring">
          <circle
            class="progress-ring-circle"
            cx="20"
            cy="20"
            r="18"
            stroke-dasharray="113.097"
            :stroke-dashoffset="progressOffset"
          />
        </svg>
      </button>
    </div>

    <div class="channel-demo-content">
      <!-- Multifirma -->
      <div
        ref="multisigRef"
        class="multisig-box"
        :class="{ 'opacity-100': step >= 1, 'opacity-0 translate-y-4': step < 1 }"
        :style="{
          left: positions.centerX + 'px',
          top: positions.multisigY + 'px',
          width: sizes.multisigWidth + 'px'
        }"
      >
        <div class="multisig-header">
          <svg class="wallet-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="6" width="18" height="12" rx="2" ry="2"/>
            <path d="M16 12h5"/>
          </svg>
          <span>{{ t('channelOpeningDemo.multisigTitle') }}</span>
        </div>
        <div class="multisig-balance">
          Balance: {{ formatBalance(multisigBalance) }} sats
        </div>
      </div>

      <!-- Flechas de depósito hacia la multifirma (LeaderLine) -->
      <div v-if="step >= 2 && step < 3" class="leader-lines-layer"></div>

      <!-- Textos de depósito e íconos de llave -->
      <div v-if="step >= 2 && step < 3">
        <div class="deposit-text" :style="{ left: nodes[0].position.x + 'px', top: nodes[0].position.y + sizes.nodeHeight/2 + 5 + 'px', maxWidth: sizes.nodeWidth * 1.4 + 'px', minWidth: sizes.nodeWidth * 1.4 + 'px' }">
          {{ t('channelOpeningDemo.depositText', { amount: formatBalance(500000) }) }}
        </div>
        <div class="deposit-text" :style="{ left: nodes[1].position.x + 'px', top: nodes[1].position.y + sizes.nodeHeight/2 + 5 + 'px', maxWidth: sizes.nodeWidth * 1.4 + 'px', minWidth: sizes.nodeWidth * 1.4 + 'px' }">
          {{ t('channelOpeningDemo.depositText', { amount: formatBalance(500000) }) }}
        </div>
        <div class="key-icon" :style="{ left: keyAlice.left + 'px', top: keyAlice.top + 'px' }">
          <svg viewBox="-2 -2 28 28" width="24" height="24" fill="none" stroke="var(--demo-accent)" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" style="overflow: visible; display: block;">
            <circle cx="6" cy="18" r="3.5" />
            <path d="M9 15 L 17 7" />
            <path d="M17 7 H 21" />
            <path d="M17 7 V 11" />
          </svg>
        </div>
        <div class="key-icon" :style="{ left: keyBob.left + 'px', top: keyBob.top + 'px' }">
          <svg viewBox="-2 -2 28 28" width="24" height="24" fill="none" stroke="var(--demo-accent)" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" style="overflow: visible; display: block; transform: scaleX(-1);">
            <circle cx="6" cy="18" r="3.5" />
            <path d="M9 15 L 17 7" />
            <path d="M17 7 H 21" />
            <path d="M17 7 V 11" />
          </svg>
        </div>
      </div>

      <!-- Canal (estilo unificado con ChannelDemo) -->
      <svg class="channel-line" :class="{ 'opacity-100': step >= 3, 'opacity-0': step < 3 }">
        <line
          :x1="nodes[0].position.x"
          :y1="positions.channelY"
          :x2="nodes[1].position.x"
          :y2="positions.channelY"
          stroke="var(--demo-accent)"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      <!-- Flecha de transferencia y logo BTC (cíclica en ambos sentidos) -->
      <div v-if="arrowPosition" class="arrow-container"
           :style="{ left: arrowPosition.x + 'px', top: arrowPosition.y + 'px', transform: `translate(-50%, -50%) rotate(${arrowPosition.direction}deg)` }">
        <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12,5 19,12 12,19"></polyline>
        </svg>
      </div>
      <div v-if="arrowPosition" class="btc-logo-container"
           :style="{ left: arrowPosition.x + 'px', top: arrowPosition.y + 'px' }">
        <svg class="btc-icon" viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
          <circle cx="16" cy="16" r="12" fill="#f7931a" />
          <text x="16" y="21" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">₿</text>
        </svg>
      </div>

      <!-- Nodos -->
      <div
        v-for="(node, i) in nodes"
        :key="`node-open-${i}`"
        class="channel-node"
        :ref="(el) => setNodeRef(el, i)"
        :style="{
          left: node.position.x + 'px',
          top: node.position.y + 'px',
          width: sizes.nodeWidth + 'px',
          height: sizes.nodeHeight + 'px',
        }"
      >
        <span class="node-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </span>
        <span class="node-name" :style="{ fontSize: sizes.fontSize }">{{ node.name }}</span>
      </div>

      <!-- Capacidades del canal -->
      <div
        v-if="step >= 3"
        class="capacity-text capacity-alice"
        :style="{
          left: nodes[0].position.x + 'px',
          top: positions.channelY + sizes.nodeHeight/2 + 0 + 'px',
          fontSize: sizes.fontSize,
        }"
      >
        {{ formatBalance(Math.round(channelCapacities.alice)) }} sats →
      </div>
      <div
        v-if="step >= 3"
        class="capacity-text capacity-bob"
        :style="{
          left: nodes[1].position.x + 'px',
          top: positions.channelY - sizes.nodeHeight/2 - 23 + 'px',
          fontSize: sizes.fontSize,
        }"
      >
        ← {{ formatBalance(Math.round(channelCapacities.bob)) }} sats
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useI18n } from '../i18n/useI18n'

interface Position { x: number; y: number }
interface ChannelNode { name: string; position: Position }

const containerRef = ref<HTMLElement>()
const multisigRef = ref<HTMLElement>()
const nodeRefs = ref<HTMLElement[]>([])
const containerSize = ref({ width: 600, height: 320 })
const progressOffset = ref(113.097)
const textAnimationKey = ref(0)

// Internacionalización
const { t } = useI18n()
const step = ref(0)

let animationTimer: number | null = null
let resizeObserver: ResizeObserver | null = null
let animationStart: number | null = null
let transferStart: number | null = null
let leaderLineAlice: any = null
let leaderLineBob: any = null
let leaderLinesActive = false

const updateContainerSize = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    containerSize.value = { width: rect.width, height: rect.height }
  }
}

const positions = computed(() => {
  const width = containerSize.value.width
  const height = containerSize.value.height
  const headerHeight = 44
  const contentHeight = height - headerHeight
  const centerX = width / 2
  // Mover el canal más abajo para que las flechas vayan rectas
  const channelFactor = width < 400 ? 0.75 : (width < 600 ? 0.78 : 0.80)
  const multisigFactor = width < 400 ? 0.22 : 0.25
  const channelY = headerHeight + contentHeight * channelFactor
  const multisigY = headerHeight + contentHeight * multisigFactor
  
  // Calcular el ancho mínimo necesario para los nodos
  const nodeWidth = sizes.value.nodeWidth
  const padding = width < 360 ? 6 : 8 // Padding reducido en pantallas muy pequeñas
  const minSpacing = nodeWidth / 2 + 20 // Mitad del nodo + padding mínimo
  
  // Calcular el espaciado máximo disponible
  const maxSpacing = Math.max(0, (width - nodeWidth - 40) / 2) // Ancho total - ancho nodo - padding total
  
  // Usar el espaciado más pequeño entre el deseado y el máximo disponible
  const desiredSpacing = width * 0.35
  const spacingX = Math.min(desiredSpacing, maxSpacing)
  
  // Asegurar que los nodos nunca se salgan del contenedor
  const aliceX = Math.max(nodeWidth / 2 + 10, centerX - spacingX)
  const bobX = Math.min(width - nodeWidth / 2 - 10, centerX + spacingX)
  
  return {
    centerX,
    channelY,
    multisigY,
    aliceX,
    bobX,
  }
})

const sizes = computed(() => {
  const w = containerSize.value.width
  // Asegurar tamaños uniformes entre nodos y suficiente ancho para el texto de depósito
  if (w < 320) return { nodeWidth: 80, nodeHeight: 32, fontSize: '11px', multisigWidth: 160, multisigHeight: 52 }
  if (w < 400) return { nodeWidth: 90, nodeHeight: 34, fontSize: '12px', multisigWidth: 170, multisigHeight: 54 }
  if (w < 600) return { nodeWidth: 110, nodeHeight: 38, fontSize: '13px', multisigWidth: 190, multisigHeight: 56 }
  if (w < 768) return { nodeWidth: 130, nodeHeight: 42, fontSize: '14px', multisigWidth: 210, multisigHeight: 58 }
  if (w < 1024) return { nodeWidth: 150, nodeHeight: 46, fontSize: '14px', multisigWidth: 230, multisigHeight: 60 }
  return { nodeWidth: 170, nodeHeight: 50, fontSize: '14px', multisigWidth: 250, multisigHeight: 62 }
})

const nodes = computed<ChannelNode[]>(() => [
  { name: 'Alice', position: { x: positions.value.aliceX, y: positions.value.channelY } },
  { name: 'Bob', position: { x: positions.value.bobX, y: positions.value.channelY } },
])

const setNodeRef = (el: Element | null, index: number) => {
  if (el) nodeRefs.value[index] = el as HTMLElement
}

const descriptionText = computed(() => {
  if (step.value < 1) return t('channelOpeningDemo.header')
  if (step.value < 2) return t('channelOpeningDemo.step1')
  if (step.value < 3) return t('channelOpeningDemo.step2')
  if (step.value < 5) return t('channelOpeningDemo.step3')
  return t('channelOpeningDemo.step4')
})

watch(descriptionText, (n, o) => { if (n !== o) textAnimationKey.value++ })

const multisigBalance = computed(() => {
  if (step.value < 2) return 0
  if (step.value >= 2.99) return 1_000_000
  const progress = Math.min(1, Math.max(0, step.value - 2))
  const balance = Math.floor(1_000_000 * progress)
  return balance === 999_999 ? 1_000_000 : balance
})

const channelCapacities = computed(() => {
  if (step.value < 3) return { alice: 500_000, bob: 500_000 }
  if (step.value >= 5) {
    const theta = Math.max(0, step.value - 5) * Math.PI * 2
    const base = 500_000
    const amount = 100_000
    const isAliceSending = Math.cos(theta) >= 0
    const progressAB = (1 - Math.cos(theta)) / 2
    if (isAliceSending) {
      const p = progressAB
      return { alice: base - amount * p, bob: base + amount * p }
    } else {
      const p = 1 - progressAB
      return { alice: 400_000 + amount * p, bob: 600_000 - amount * p }
    }
  }
  return { alice: 500_000, bob: 500_000 }
})

// Altura base para la línea de funding (un poco por debajo de la multifirma)
const fundingBaseY = computed(() => positions.value.multisigY + sizes.value.multisigHeight / 2 + 20)

// Calcular líneas hacia la multifirma usando posiciones conocidas (centros geométricos)
const fundingLineAlice = computed(() => {
  const x1 = nodes.value[0].position.x
  const y1 = nodes.value[0].position.y - sizes.value.nodeHeight / 2
  const x2 = positions.value.centerX
  const y2 = positions.value.multisigY + sizes.value.multisigHeight / 2
  return { x1, y1, x2, y2 }
})

const fundingLineBob = computed(() => {
  const x1 = nodes.value[1].position.x
  const y1 = nodes.value[1].position.y - sizes.value.nodeHeight / 2
  const x2 = positions.value.centerX
  const y2 = positions.value.multisigY + sizes.value.multisigHeight / 2
  return { x1, y1, x2, y2 }
})

// Posición precisa de iconos llave al borde superior externo de cada nodo (hacia la línea)
const keyAlice = computed(() => {
  // Posicionar la llave de Alice siempre relativa al nodo y tamaños calculados (robusto en mobile)
  const offsetX = Math.min(24, sizes.value.nodeWidth * 0.15)
  const width = containerSize.value.width
  const extraOffset = width < 768 ? 5 : 0 // 5px extra a la izquierda en móviles
  const left = nodes.value[0].position.x - offsetX - 8 - extraOffset // 8px más a la izquierda + extra en móviles
  const top = nodes.value[0].position.y - sizes.value.nodeHeight / 2 - 24
  return { left, top }
})

const keyBob = computed(() => {
  // Posicionar la llave de Bob siempre relativa al nodo y tamaños calculados (robusto en mobile)
  const offsetX = Math.min(24, sizes.value.nodeWidth * 0.15)
  const left = nodes.value[1].position.x + offsetX - 13 // 13px más a la izquierda
  const top = nodes.value[1].position.y - sizes.value.nodeHeight / 2 - 24
  return { left, top }
})
const arrowPosition = computed(() => {
  if (step.value < 5) return null
  const nodeMargin = sizes.value.nodeWidth / 2 + 20
  const startX = nodes.value[0].position.x + nodeMargin
  const endX = nodes.value[1].position.x - nodeMargin
  const range = endX - startX
  const cycle = Math.max(0, step.value - 5)
  const theta = cycle * Math.PI * 2
  const progress = (1 - Math.cos(theta)) / 2
  const direction = Math.sin(theta) >= 0 ? 0 : 180
  return { x: startX + range * progress, y: positions.value.channelY, direction }
})

const formatBalance = (balance: number) => {
  if (balance >= 1_000_000) return `${(balance / 1_000_000).toFixed(1)}M`
  if (balance >= 1_000) return `${(balance / 1_000).toFixed(0)}k`
  return `${balance}`
}

const startAnimation = () => {
  const animate = (timestamp: number) => {
    if (!animationStart) animationStart = timestamp
    const progress = timestamp - animationStart

    if (progress >= 20000) {
      animationStart = timestamp
      transferStart = null
      step.value = 0
      animationTimer = requestAnimationFrame(animate)
      return
    }

    let currentStep
    if (progress < 2000) {
      currentStep = 0
    } else if (progress < 4000) {
      currentStep = 1
    } else if (progress < 4100) {
      currentStep = 2
    } else if (progress < 5100) {
      currentStep = 2 + (progress - 4100) / 1000
    } else if (progress < 8000) {
      currentStep = 2.99
    } else if (progress < 10000) {
      currentStep = 3
    } else if (progress < 11000) {
      currentStep = 4
    } else {
      if (!transferStart) transferStart = timestamp
      const cycleProgress = (timestamp - transferStart) / 3500
      currentStep = 5 + (cycleProgress % 1)
    }

    step.value = currentStep
    // mantener flechas posicionadas si están visibles
    if (leaderLinesActive) {
      try { leaderLineAlice && leaderLineAlice.position() } catch {}
      try { leaderLineBob && leaderLineBob.position() } catch {}
    }
    // progress ring
    const totalSteps = 20000 / 50
    const elapsedSteps = Math.min(totalSteps, Math.floor(progress / 50))
    progressOffset.value = 113.097 * (1 - elapsedSteps / totalSteps)

    animationTimer = requestAnimationFrame(animate)
  }
  animationTimer = requestAnimationFrame(animate)
}

const restartAnimation = () => {
  if (animationTimer) cancelAnimationFrame(animationTimer)
  animationTimer = null
  animationStart = null
  progressOffset.value = 113.097
  step.value = 0
  startAnimation()
}

onMounted(() => {
  updateContainerSize()
  resizeObserver = new ResizeObserver(() => updateContainerSize())
  if (containerRef.value) resizeObserver.observe(containerRef.value)
  window.addEventListener('resize', positionLeaderLines, { passive: true })
  document.addEventListener('scroll', positionLeaderLines, { passive: true, capture: true })
  startAnimation()
})

onUnmounted(() => {
  if (animationTimer) cancelAnimationFrame(animationTimer)
  if (resizeObserver) resizeObserver.disconnect()
  destroyLeaderLines()
  window.removeEventListener('resize', positionLeaderLines as any)
  document.removeEventListener('scroll', positionLeaderLines as any, true)
})

// LeaderLine helpers
const setupLeaderLines = async () => {
  if (typeof window === 'undefined') return
  const { default: LeaderLine } = await import('leader-line-new')
  if (!nodeRefs.value[0] || !nodeRefs.value[1] || !multisigRef.value) return
  const aliceEl = nodeRefs.value[0]
  const bobEl = nodeRefs.value[1]
  const multiEl = multisigRef.value
  const isDark = document.documentElement.classList.contains('dark')
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--demo-accent')?.trim() || '#a78bfa'

  leaderLineAlice = new LeaderLine(
    LeaderLine.pointAnchor(aliceEl, { x: '50%', y: 0 }),
    LeaderLine.pointAnchor(multiEl, { x: '50%', y: '100%' }),
    {
      color: accentColor,
      size: 3,
      path: 'grid',
      startPlug: 'behind',
      endPlug: 'arrow3',
      endPlugSize: 1.6,
      dropShadow: isDark,
      startSocket: 'top',
      endSocket: 'bottom',
      gradient: false,
    }
  )

  leaderLineBob = new LeaderLine(
    LeaderLine.pointAnchor(bobEl, { x: '50%', y: 0 }),
    LeaderLine.pointAnchor(multiEl, { x: '50%', y: '100%' }),
    {
      color: accentColor,
      size: 3,
      path: 'grid',
      startPlug: 'behind',
      endPlug: 'arrow3',
      endPlugSize: 1.6,
      dropShadow: isDark,
      startSocket: 'top',
      endSocket: 'bottom',
      gradient: false,
    }
  )
  leaderLinesActive = true
  try {
    leaderLineAlice.hide('none')
    leaderLineBob.hide('none')
    // animación de dibujo desde los nodos hacia la multifirma
    leaderLineAlice.show('draw', { duration: 900, timing: 'linear' })
    leaderLineBob.show('draw', { duration: 900, timing: 'linear' })
  } catch {}
}

const destroyLeaderLines = () => {
  try { leaderLineAlice && leaderLineAlice.hide('fade', { duration: 250 }) } catch {}
  try { leaderLineBob && leaderLineBob.hide('fade', { duration: 250 }) } catch {}
  // pequeña demora para permitir que termine el fade
  setTimeout(() => {
    try { leaderLineAlice && leaderLineAlice.remove() } catch {}
    try { leaderLineBob && leaderLineBob.remove() } catch {}
  }, 260)
  leaderLineAlice = null
  leaderLineBob = null
  leaderLinesActive = false
}

const showFunding = computed(() => step.value >= 2 && step.value < 3)

watch(showFunding, async (visible) => {
  if (visible) {
    await nextTick()
    if (!leaderLinesActive) await setupLeaderLines()
    positionLeaderLines()
  } else {
    destroyLeaderLines()
  }
})

watch(containerSize, () => {
  if (leaderLineAlice) leaderLineAlice.position()
  if (leaderLineBob) leaderLineBob.position()
})

function positionLeaderLines() {
  try { leaderLineAlice && leaderLineAlice.position() } catch {}
  try { leaderLineBob && leaderLineBob.position() } catch {}
}
</script>

<style scoped>
.channel-demo-container {
  position: relative;
  margin: 0 auto 2rem auto;
  background-color: var(--demo-bg);
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  min-width: 280px;
  height: 340px;
  min-height: 300px;
  z-index: 0;
}

.channel-demo-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background-color: var(--demo-header-bg);
  z-index: 20;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-spacer { width: 40px; }
.header-text { color: var(--demo-accent); font-size: 14px; font-weight: 500; min-height: 16px; line-height: 1.2; transition: all 0.3s ease; text-align: center; flex: 1; margin: 0 8px; }
.animate-text-explode { animation: textExplode 0.3s ease-out; }
@keyframes textExplode { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }

.restart-button { background: none; border: none; color: var(--demo-accent); font-size: 16px; cursor: pointer; padding: 4px; border-radius: 50%; transition: all 0.2s ease; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; position: relative; }
.restart-button:hover { background-color: rgba(167, 139, 250, 0.1); transform: scale(1.1); }
.restart-icon { position: relative; z-index: 2; font-size: 18px; }
.progress-ring { position: absolute; top: 50%; left: 50%; width: 40px; height: 40px; transform: translate(-50%, -50%); transform-origin: center; z-index: 1; }
.progress-ring-circle { fill: none; stroke: var(--demo-accent); stroke-width: 2; stroke-linecap: round; transition: stroke-dashoffset 0.05s linear; }

.channel-demo-content { position: absolute; inset: 0; padding-top: 48px; }

.channel-line { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; transition: opacity 1s ease-in-out; }
.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }

.arrow-container { position: absolute; z-index: 15; pointer-events: none; }
.arrow-icon { color: var(--demo-accent); width: 24px; height: 24px; }
.btc-logo-container { position: absolute; z-index: 16; pointer-events: none; transform: translate(-50%, -140%); }
.btc-icon { display: block; }

.channel-node { position: absolute; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 2px solid var(--demo-accent); font-weight: 500; color: var(--demo-node-text); z-index: 20; background-color: var(--demo-node-bg); transition: all 0.5s ease-in-out; transform: translate(-50%, -50%); padding: 0 8px; box-sizing: border-box; }
.node-icon { margin-right: 4px; display: flex; align-items: center; color: var(--demo-accent); }
.node-icon svg { width: 16px; height: 16px; }
.node-name { white-space: nowrap; font-size: 14px; }

.capacity-text { position: absolute; transform: translateX(-50%); color: var(--demo-capacity-text); font-size: 12px; font-weight: 500; white-space: nowrap; z-index: 25; pointer-events: none; transition: opacity 0.8s ease-in-out; }
.capacity-alice { text-align: right; }
.capacity-bob { text-align: left; }

.multisig-box { position: absolute; transform: translate(-50%, -50%); background-color: var(--demo-header-bg); border: 1px solid var(--demo-accent); border-radius: 8px; color: var(--demo-text); padding: 8px 12px; transition: all 0.5s ease; }
.multisig-header { display: inline-flex; align-items: center; justify-content: center; gap: 8px; color: var(--demo-accent); font-size: 12px; margin-bottom: 4px; width: 100%; }
.wallet-icon { width: 24px; height: 26px; color: #a78bfa; display: inline-block; vertical-align: middle; }
.multisig-balance { font-size: 12px; color: var(--demo-muted); text-align: center; }

.funding-arrows { position: absolute; inset: 0; z-index: 22; pointer-events: none; }
.draw-line { opacity: 0; transition: opacity 600ms ease; }
.draw-line-active { opacity: 1; }

.deposit-text { position: absolute; transform: translate(-50%, 0); color: var(--demo-accent); font-size: 12px; font-weight: 500; white-space: normal; text-align: center; line-height: 1.2; transition: opacity 1s ease, transform 1s ease; opacity: 1; text-shadow: 0 0 6px rgba(167,139,250,0.25); }
.key-icon { position: absolute; transition: opacity 1s ease, transform 200ms ease; opacity: 1; }

@media (max-width: 768px) {
  .channel-demo-container { height: 340px; min-height: 300px; }
}

@media (max-width: 480px) {
  .channel-demo-container { height: 320px; min-height: 280px; }
  .header-text { font-size: 12px; }
}

@media (max-width: 360px) {
  .channel-demo-container { height: 300px; min-height: 260px; }
  .header-text { font-size: 11px; }
  .node-name { font-size: 11px !important; }
  .node-icon svg { width: 14px; height: 14px; }
  .multisig-header { font-size: 11px; gap: 6px; }
  .multisig-balance { font-size: 11px; }
  .deposit-text { font-size: 11px; }
  .capacity-text { font-size: 11px; }
  .channel-node { padding: 0 6px; }
}
</style>


