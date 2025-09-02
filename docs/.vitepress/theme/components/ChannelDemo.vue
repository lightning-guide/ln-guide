<template>
  <div class="channel-demo-container" ref="containerRef">
    <div class="channel-demo-header">
      <div class="header-spacer"></div>
      <p class="header-text" :key="textAnimationKey" :class="{ 'animate-text-explode': textAnimationKey > 0 }">
        {{ descriptionText }}
      </p>
      <button @click="restartAnimation" class="restart-button" :title="t('channelDemo.restartButton')">
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
      <!-- Línea del canal -->
      <svg
        class="channel-line"
        :class="{ 'opacity-100': isChannelVisible, 'opacity-0': !isChannelVisible }"
      >
        <line
          :x1="nodes[0].position.x"
          :y1="nodes[0].position.y"
          :x2="nodes[1].position.x"
          :y2="nodes[1].position.y"
          stroke="var(--demo-accent)"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      <!-- Flecha animada -->
      <div
        v-if="arrowPosition"
        class="arrow-container"
        :style="{
          left: arrowPosition.x + 'px',
          top: arrowPosition.y + 'px',
          transform: `translate(-50%, -50%) rotate(${arrowPosition.direction}deg)`
        }"
      >
        <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12,5 19,12 12,19"></polyline>
        </svg>
      </div>

      <!-- Logo Bitcoin sobre la flecha -->
      <div
        v-if="arrowPosition"
        class="btc-logo-container"
        :style="{
          left: arrowPosition.x + 'px',
          top: arrowPosition.y + 'px'
        }"
      >
        <svg class="btc-icon" viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
          <circle cx="16" cy="16" r="12" fill="#f7931a" />
          <text x="16" y="21" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">₿</text>
        </svg>
      </div>

      <!-- Nodos -->
      <div
        v-for="(node, i) in nodes"
        :key="`node-${i}`"
        class="channel-node"
        :class="node.type"
        :style="{
          left: node.position.x + 'px',
          top: node.position.y + 'px',
          opacity: node.isVisible ? 1 : 0,
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

      <!-- Capacidades -->
      <div
        class="capacity-text capacity-alice"
        :class="{ 'opacity-100': step >= 2, 'opacity-0': step < 2 }"
        :style="{
          left: nodes[0].position.x + 'px',
          top: nodes[0].position.y + sizes.nodeHeight/2 + 4 + 'px',
          fontSize: sizes.fontSize,
        }"
      >
        {{ formatCapacity(capacities.alice) }} sats →
      </div>
      
      <div
        class="capacity-text capacity-bob"
        :class="{ 'opacity-100': step >= 2, 'opacity-0': step < 2 }"
        :style="{
          left: nodes[1].position.x + 'px',
          top: nodes[1].position.y - sizes.nodeHeight/2 - 24 + 'px',
          fontSize: sizes.fontSize,
        }"
      >
        ← {{ formatCapacity(capacities.bob) }} sats
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '../i18n/useI18n'

interface Position {
  x: number
  y: number
}

interface ChannelNode {
  name: string
  position: Position
  type: 'lightning'
  isVisible: boolean
}

interface ArrowPosition {
  x: number
  y: number
  direction: number
}

interface ResponsiveSizes {
  nodeWidth: number
  nodeHeight: number
  fontSize: string
  iconSize: string
  padding: string
  textWidth: number
  capacityFormat: 'k' | 'full'
}

// Estado reactivo
const step = ref(0)
const containerRef = ref<HTMLElement>()
const containerSize = ref({ width: 600, height: 240 })
const progressOffset = ref(113.097)
const textAnimationKey = ref(0)
const previousText = ref('')

// Internacionalización
const { t } = useI18n()

// Animación
let animationTimer: number | null = null
let resizeObserver: ResizeObserver | null = null
let progressTimer: number | null = null
let animationStart: number | null = null
let transferStart: number | null = null

const updateContainerSize = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    containerSize.value = {
      width: rect.width,
      height: rect.height
    }
  }
}

// Calcular posiciones relativas al contenedor
const getRelativePositions = computed(() => {
  if (containerSize.value.width === 0 || containerSize.value.height === 0) {
    return { alice: 0, bob: 0, centerY: 0 }
  }

  const centerX = containerSize.value.width / 2
  const headerHeight = 44
  const availableHeight = containerSize.value.height - headerHeight
  const centerY = headerHeight + (availableHeight / 2)
  const spacing = containerSize.value.width * 0.25

  return {
    alice: centerX - spacing,
    bob: centerX + spacing,
    centerY: centerY
  }
})

// Calcular tamaños responsive
const getResponsiveSizes = computed((): ResponsiveSizes => {
  const containerWidth = containerSize.value.width
  
  if (containerWidth < 400) {
    return {
      nodeWidth: 80,
      nodeHeight: 32,
      fontSize: '11px',
      iconSize: 'w-3 h-3',
      padding: 'px-2 py-1',
      textWidth: 60,
      capacityFormat: 'k',
    }
  } else if (containerWidth < 600) {
    return {
      nodeWidth: 100,
      nodeHeight: 36,
      fontSize: '12px',
      iconSize: 'w-4 h-4',
      padding: 'px-3 py-1.5',
      textWidth: 80,
      capacityFormat: 'k',
    }
  } else if (containerWidth < 768) {
    return {
      nodeWidth: 120,
      nodeHeight: 40,
      fontSize: '14px',
      iconSize: 'w-4 h-4',
      padding: 'px-3 py-2',
      textWidth: 100,
      capacityFormat: 'full',
    }
  } else if (containerWidth < 1024) {
    return {
      nodeWidth: 140,
      nodeHeight: 44,
      fontSize: '14px',
      iconSize: 'w-5 h-5',
      padding: 'px-4 py-2',
      textWidth: 120,
      capacityFormat: 'full',
    }
  } else {
    return {
      nodeWidth: 160,
      nodeHeight: 48,
      fontSize: '14px',
      iconSize: 'w-5 h-5',
      padding: 'px-4 py-2',
      textWidth: 140,
      capacityFormat: 'full',
    }
  }
})

const sizes = getResponsiveSizes
const positions = getRelativePositions

// Nodos
const nodes = computed((): ChannelNode[] => {
  return [
    {
      name: "Alice",
      position: { x: positions.value.alice, y: positions.value.centerY },
      type: "lightning",
      isVisible: step.value >= 0,
    },
    {
      name: "Bob",
      position: { x: positions.value.bob, y: positions.value.centerY },
      type: "lightning",
      isVisible: step.value >= 0,
    },
  ]
})

// Calcular visibilidad de elementos
const isChannelVisible = computed(() => step.value >= 1)
const isArrowAnimating = computed(() => step.value >= 3)

// Calcular posición de la flecha
const arrowPosition = computed((): ArrowPosition | null => {
  if (step.value < 3 || containerSize.value.width === 0) return null

  const nodeMargin = sizes.value.nodeWidth / 2 + 20
  const startX = positions.value.alice + nodeMargin
  const endX = positions.value.bob - nodeMargin
  const range = endX - startX

  const cycleStep = Math.max(0, step.value - 3)
  const progress = (Math.sin(cycleStep * Math.PI * 2) + 1) / 2

  return {
    x: startX + range * progress,
    y: positions.value.centerY,
    direction: Math.cos(cycleStep * Math.PI * 2) > 0 ? 0 : 180,
  }
})

// Obtener texto descriptivo
const descriptionText = computed(() => {
  if (step.value < 1) return t('channelDemo.header')
  if (step.value < 3) return t('channelDemo.step1')
  const isAliceSending = Math.cos(Math.max(0, step.value - 3) * Math.PI * 2) > 0
  return isAliceSending ? t('channelDemo.step2') : t('channelDemo.step3')
})

// Detectar cambios en el texto para activar la animación
watch(descriptionText, (newText, oldText) => {
  if (newText !== oldText) {
    textAnimationKey.value++
  }
})

// Calcular las capacidades
const capacities = computed(() => {
  const baseCapacity = 500_000
  const transferAmount = 100_000

  if (step.value < 3) {
    return {
      alice: baseCapacity,
      bob: baseCapacity,
    }
  }

  // Sincronizar con la flecha: misma fase; dentro de cada medio ciclo el progreso es monótono 0→1
  const cycleStep = Math.max(0, step.value - 3)
  const theta = cycleStep * Math.PI * 2
  const isAliceSending = Math.cos(theta) >= 0
  // Progreso de la flecha (centro→extremo) usado también como odómetro en cada medio ciclo
  const progressAB = (Math.sin(theta) + 1) / 2

  if (isAliceSending) {
    const progress = progressAB // 0→1 mientras la flecha va de Alice a Bob
    return {
      alice: baseCapacity - transferAmount * progress,
      bob: baseCapacity + transferAmount * progress,
    }
  } else {
    const progress = 1 - progressAB // 0→1 mientras la flecha va de Bob a Alice
    return {
      alice: 400_000 + transferAmount * progress,
      bob: 600_000 - transferAmount * progress,
    }
  }
})

// Función para formatear capacidades
const formatCapacity = (amount: number) => {
  if (sizes.value.capacityFormat === 'k') {
    return `${Math.round(amount / 1000)}k`
  } else {
    return `${Math.round(amount).toLocaleString().replace(/,/g, "")}`
  }
}

// Animación principal
const startAnimation = () => {
  const animate = (timestamp: number) => {
    if (!animationStart) animationStart = timestamp
    const progress = timestamp - animationStart

    // Reiniciar después de 12 segundos
    if (progress >= 12000) {
      animationStart = timestamp
      transferStart = null
      step.value = 0
      animationTimer = requestAnimationFrame(animate)
      return
    }

    let currentStep
    if (progress < 1000) {
      currentStep = progress / 1000 // 0→1: Aparecen Alice y Bob (sin canal)
    } else if (progress < 3000) {
      currentStep = 2 // Valor fijo durante la apertura (con línea)
    } else {
      if (!transferStart) {
        transferStart = timestamp
        currentStep = 3
      } else {
        const transferProgress = (timestamp - transferStart) / 3000
        currentStep = 3 + (transferProgress % 1)
      }
    }

    step.value = currentStep
    animationTimer = requestAnimationFrame(animate)
  }

  animationTimer = requestAnimationFrame(animate)
}

const stopAnimation = () => {
  if (animationTimer) {
    cancelAnimationFrame(animationTimer)
    animationTimer = null
  }
}

// Progreso automático
const startProgressAnimation = () => {
  const duration = 12000 // 12 segundos
  const interval = 50
  const totalSteps = duration / interval
  let currentStep = 0
  
  progressTimer = window.setInterval(() => {
    currentStep++
    const progress = currentStep / totalSteps
    progressOffset.value = 113.097 * (1 - progress)
    
    if (currentStep >= totalSteps) {
      stopProgressAnimation()
      restartAnimation()
    }
  }, interval)
}

const stopProgressAnimation = () => {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
  progressOffset.value = 113.097
}

const restartAnimation = () => {
  stopAnimation()
  stopProgressAnimation()
  step.value = 0
  animationStart = null
  transferStart = null
  startAnimation()
  startProgressAnimation()
}

onMounted(() => {
  updateContainerSize()
  startAnimation()
  startProgressAnimation()
  
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateContainerSize()
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  stopAnimation()
  stopProgressAnimation()
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
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
  height: 240px;
  min-height: 180px;
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

.header-spacer {
  width: 40px;
}

.header-text {
  color: var(--demo-accent);
  font-size: 14px;
  font-weight: 500;
  min-height: 16px;
  line-height: 1.2;
  transition: all 0.3s ease;
  text-align: center;
  flex: 1;
  margin: 0 8px;
}

.animate-text-explode {
  animation: textExplode 0.3s ease-out;
}

@keyframes textExplode {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.restart-button {
  background: none;
  border: none;
  color: var(--demo-accent);
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.restart-button:hover {
  background-color: rgba(167, 139, 250, 0.1);
  transform: scale(1.1);
}

.restart-icon {
  position: relative;
  z-index: 2;
  font-size: 18px;
}

.progress-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  transform-origin: center;
  z-index: 1;
}

.progress-ring-circle {
  fill: none;
  stroke: var(--demo-accent);
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.05s linear;
}

.channel-demo-content {
  position: absolute;
  inset: 0;
  padding-top: 48px;
}

.channel-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  transition: opacity 1s ease-in-out;
}

/* Utilidades de opacidad para transición de la línea del canal */
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}

.arrow-container {
  position: absolute;
  z-index: 15;
  pointer-events: none;
}

.arrow-icon {
  color: var(--demo-accent);
  width: 24px;
  height: 24px;
}

.btc-logo-container {
  position: absolute;
  z-index: 16;
  pointer-events: none;
  transform: translate(-50%, -140%);
}

.btc-icon {
  display: block;
}

.channel-node {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid var(--demo-accent);
  font-weight: 500;
  color: var(--demo-node-text);
  z-index: 20;
  background-color: var(--demo-node-bg);
  transition: all 0.5s ease-in-out;
  transform: translate(-50%, -50%);
  padding: 0 8px;
}

.channel-node[style*="opacity: 0"] {
  transform: translate(-50%, -50%) scale(0.8);
}

.node-icon {
  margin-right: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: var(--demo-accent);
}

.node-icon svg {
  width: 16px;
  height: 16px;
}

.node-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

.capacity-text {
  position: absolute;
  transform: translateX(-50%);
  color: var(--demo-capacity-text);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 25;
  pointer-events: none;
  transition: opacity 0.8s ease-in-out;
}

.capacity-alice {
  text-align: right;
}

.capacity-bob {
  text-align: left;
}

/* Responsive styles */
@media (max-width: 768px) {
  .channel-demo-container {
    height: 200px;
    min-height: 160px;
  }
  
  .channel-node {
    padding: 0 6px;
  }
  
  .node-name {
    font-size: 12px;
  }
  
  .node-icon svg {
    width: 14px;
    height: 14px;
  }
  
  .capacity-text {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .channel-demo-container {
    height: 180px;
    min-height: 140px;
  }
  
  .channel-node {
    padding: 0 4px;
  }
  
  .node-name {
    font-size: 11px;
  }
  
  .node-icon svg {
    width: 12px;
    height: 12px;
  }
  
  .capacity-text {
    font-size: 10px;
  }
  
  .header-text {
    font-size: 12px;
  }
}
</style>
