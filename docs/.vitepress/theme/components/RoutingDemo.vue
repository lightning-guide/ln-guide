<template>
  <div class="channel-demo-container" ref="containerRef">
    <div class="channel-demo-header">
      <div class="header-spacer"></div>
      <p class="header-text" :key="textAnimationKey" :class="{ 'animate-text-explode': textAnimationKey > 0 }">
        {{ descriptionText }}
      </p>
      <button @click="restartAnimation" class="restart-button" :title="t('routingDemo.restartButton')">
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
      <!-- Canales -->
      <svg class="channel-line" style="z-index: 10;">
        <!-- Alice-Bob -->
        <line
          :x1="nodes[0].position.x"
          :y1="positions.centerY"
          :x2="nodes[1].position.x"
          :y2="positions.centerY"
          stroke="var(--demo-accent)"
          stroke-width="3"
          stroke-linecap="round"
          :class="{ 'opacity-100': step >= 2, 'opacity-0': step < 2 }"
        />
        <!-- Bob-Carol -->
        <line
          :x1="nodes[1].position.x"
          :y1="positions.centerY"
          :x2="nodes[2].position.x"
          :y2="positions.centerY"
          stroke="var(--demo-accent)"
          stroke-width="3"
          stroke-linecap="round"
          :class="{ 'opacity-100': step >= 3, 'opacity-0': step < 3 }"
        />
      </svg>

      <!-- Flecha animada de enrutamiento -->
      <div v-if="arrowPosition" class="arrow-container"
           :style="{ left: arrowPosition.x + 'px', top: arrowPosition.y + 'px', transform: `translate(-50%, -50%) rotate(${arrowPosition.direction}deg)` }">
        <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12,5 19,12 12,19"></polyline>
        </svg>
      </div>

      <!-- Nodos -->
      <div
        v-for="(node, i) in nodes"
        :key="`route-node-${i}`"
        class="channel-node"
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
        <span class="node-name" :style="{ fontSize: sizes.fontSize }">{{ getNodeName(node.name) }}</span>
      </div>

      <!-- Capacidades -->
      <div v-if="step >= 2" class="capacity-text" :style="{ left: nodes[0].position.x + 'px', top: positions.centerY + sizes.nodeHeight/2 + 6 + 'px', fontSize: sizes.fontSize }">
        {{ capacityText('alice', 'right') }}
      </div>
      <div v-if="step >= 2" class="capacity-text" :style="{ left: nodes[1].position.x + 'px', top: positions.centerY - sizes.nodeHeight/2 - 24 + 'px', fontSize: sizes.fontSize }">
        {{ capacityText('bobAlice', 'left') }}
      </div>
      <div v-if="step >= 3" class="capacity-text" :style="{ left: nodes[1].position.x + 'px', top: positions.centerY + sizes.nodeHeight/2 + 6 + 'px', fontSize: sizes.fontSize }">
        {{ capacityText('bobCarol', 'right') }}
      </div>
      <div v-if="step >= 3" class="capacity-text" :style="{ left: nodes[2].position.x + 'px', top: positions.centerY - sizes.nodeHeight/2 - 24 + 'px', fontSize: sizes.fontSize }">
        {{ capacityText('carol', 'left') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '../i18n/useI18n'

interface Position { x: number; y: number }
interface ChannelNode { name: string; position: Position }

const step = ref(0)
const containerRef = ref<HTMLElement>()
const containerSize = ref({ width: 600, height: 260 })
const progressOffset = ref(113.097)
const textAnimationKey = ref(0)

// Internacionalización
const { t } = useI18n()

let animationTimer: number | null = null
let resizeObserver: ResizeObserver | null = null
let animationStart: number | null = null

const updateContainerSize = () => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  containerSize.value = { width: rect.width, height: rect.height }
}

const positions = computed(() => {
  const w = containerSize.value.width
  const h = containerSize.value.height
  const headerHeight = 44
  const centerX = w / 2
  const centerY = headerHeight + (h - headerHeight) / 2
  
  // Calcular espaciado base
  let spacing: number
  if (w < 350) spacing = w * 0.25
  else if (w < 400) spacing = w * 0.28
  else if (w < 500) spacing = w * 0.30
  else if (w < 600) spacing = w * 0.32
  else spacing = w * 0.35
  
  // Si los nodos están abreviados, aumentar el espaciado para dar más espacio a las líneas del canal
  if (sizes.value.useAbbreviations) {
    spacing = Math.min(spacing * 1.4, w * 0.42) // Aumentar hasta 40% más, pero máximo 42% del ancho
  }
  
  return { centerX, centerY, aliceX: centerX - spacing, bobX: centerX, carolX: centerX + spacing }
})

type SizeInfo = { nodeWidth: number; nodeHeight: number; fontSize: string; useAbbreviations: boolean; capacityFormat: 'k' | 'full' }
const sizes = computed<SizeInfo>(() => {
  const w = containerSize.value.width
  if (w < 350) return { nodeWidth: 32, nodeHeight: 20, fontSize: '11px', useAbbreviations: true, capacityFormat: 'k' }
  if (w < 400) return { nodeWidth: 40, nodeHeight: 24, fontSize: '11px', useAbbreviations: true, capacityFormat: 'k' }
  if (w < 500) return { nodeWidth: 50, nodeHeight: 28, fontSize: '12px', useAbbreviations: true, capacityFormat: 'k' }
  if (w < 600) return { nodeWidth: 80, nodeHeight: 32, fontSize: '13px', useAbbreviations: false, capacityFormat: 'full' }
  if (w < 768) return { nodeWidth: 120, nodeHeight: 40, fontSize: '14px', useAbbreviations: false, capacityFormat: 'full' }
  if (w < 1024) return { nodeWidth: 140, nodeHeight: 44, fontSize: '14px', useAbbreviations: false, capacityFormat: 'full' }
  return { nodeWidth: 160, nodeHeight: 48, fontSize: '14px', useAbbreviations: false, capacityFormat: 'full' }
})

const nodes = computed<ChannelNode[]>(() => [
  { name: 'Alice', position: { x: positions.value.aliceX, y: positions.value.centerY } },
  { name: 'Bob', position: { x: positions.value.bobX, y: positions.value.centerY } },
  { name: 'Carol', position: { x: positions.value.carolX, y: positions.value.centerY } },
])

const descriptionText = computed(() => {
  if (step.value < 1) return t('routingDemo.header')
  if (step.value < 3) return t('routingDemo.step1')
  if (step.value < 4) return t('routingDemo.step2')
  return t('routingDemo.step3')
})

watch(descriptionText, (n, o) => { if (n !== o) textAnimationKey.value++ })

// Capacidades por tramo
const capacities = computed(() => {
  const aliceBobBase = 500_000
  const bobCarolBaseBob = 225_000
  const bobCarolBaseCarol = 575_000
  const transferAmount = 50_000

  if (step.value < 4) {
    return { alice: aliceBobBase, bobAlice: aliceBobBase, bobCarol: bobCarolBaseBob, carol: bobCarolBaseCarol }
  }

  const p = Math.min(1, Math.max(0, step.value - 4))
  if (p <= 0.5) {
    const amount = transferAmount * (p * 2)
    return { alice: aliceBobBase - amount, bobAlice: aliceBobBase + amount, bobCarol: bobCarolBaseBob, carol: bobCarolBaseCarol }
  }
  const amount = transferAmount * ((p - 0.5) * 2)
  return { alice: aliceBobBase - transferAmount, bobAlice: aliceBobBase + transferAmount, bobCarol: bobCarolBaseBob - amount, carol: bobCarolBaseCarol + amount }
})

const formatCapacity = (amount: number) => {
  if (sizes.value.capacityFormat === 'k') return `${Math.round(amount / 1000)}k`
  return `${Math.round(amount).toLocaleString().replace(/,/g, '')}`
}

const getNodeName = (name: string) => sizes.value.useAbbreviations ? name.charAt(0) : name

const capacityText = (key: 'alice'|'bobAlice'|'bobCarol'|'carol', dir: 'left'|'right') => {
  const map = capacities.value as any
  const val = formatCapacity(Math.round(map[key]))
  if (sizes.value.capacityFormat === 'k') return dir === 'left' ? `← ${val}` : `${val} →`
  return dir === 'left' ? `← ${val} sats` : `${val} sats →`
}

// Flecha de enrutamiento a través de Bob
const arrowPosition = computed(() => {
  if (step.value < 4) return null
  const p = Math.min(1, Math.max(0, step.value - 4))
  const margin = sizes.value.nodeWidth / 2 + 20
  const y = positions.value.centerY
  if (p <= 0.5) {
    const lp = p * 2
    const startX = nodes.value[0].position.x + margin
    const endX = nodes.value[1].position.x - margin
    return { x: startX + (endX - startX) * lp, y, direction: 0 }
  }
  const lp = (p - 0.5) * 2
  const startX = nodes.value[1].position.x + margin
  const endX = nodes.value[2].position.x - margin
  return { x: startX + (endX - startX) * lp, y, direction: 0 }
})

// Animación principal
const startAnimation = () => {
  const animate = (timestamp: number) => {
    if (!animationStart) animationStart = timestamp
    const progress = timestamp - animationStart

    if (progress >= 12000) {
      animationStart = timestamp
      step.value = 0
      animationTimer = requestAnimationFrame(animate)
      return
    }

    const currentStep =
      progress < 1000 ? progress / 1000 :
      progress < 3000 ? 2 :
      progress < 5000 ? 3 :
      progress < 10000 ? 4 + (progress - 5000) / 5000 :
      5

    step.value = currentStep

    // progress ring
    const total = 12000
    progressOffset.value = 113.097 * (1 - Math.min(1, progress / total))
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
  startAnimation()
})

onUnmounted(() => {
  if (animationTimer) cancelAnimationFrame(animationTimer)
  if (resizeObserver) resizeObserver.disconnect()
})
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
  height: 260px;
  min-height: 220px;
  z-index: 0;
}

.channel-demo-header { position: absolute; top: 0; left: 0; right: 0; padding: 12px; background-color: var(--demo-header-bg); z-index: 20; height: 44px; display: flex; align-items: center; justify-content: space-between; }
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
.channel-line { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; transition: opacity 0.5s ease-in-out; }
.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }

.arrow-container { position: absolute; z-index: 15; pointer-events: none; }
.arrow-icon { color: var(--demo-accent); width: 24px; height: 24px; }

.channel-node { position: absolute; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 2px solid var(--demo-accent); font-weight: 500; color: var(--demo-node-text); z-index: 20; background-color: var(--demo-node-bg); transition: all 0.5s ease-in-out; transform: translate(-50%, -50%); padding: 0 8px; }
.node-icon { margin-right: 4px; display: flex; align-items: center; color: var(--demo-accent); }
.node-icon svg { width: 16px; height: 16px; }
.node-name { white-space: nowrap; font-size: 14px; }

.capacity-text { position: absolute; transform: translateX(-50%); color: var(--demo-capacity-text); font-size: 12px; font-weight: 500; white-space: nowrap; z-index: 25; pointer-events: none; }

@media (max-width: 768px) { .channel-demo-container { height: 240px; min-height: 200px; } }
@media (max-width: 480px) { .channel-demo-container { height: 220px; min-height: 180px; } .header-text { font-size: 12px; } }
</style>


