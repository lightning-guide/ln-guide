<template>
  <div class="network-demo-container" ref="containerRef">
         <div class="network-demo-header">
       <div class="header-spacer"></div>
       <p class="header-text">{{ t('networkDemo.header') }}</p>
       <button @click="restartAnimation" class="restart-button" :title="t('networkDemo.restartButton')">
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
    
         <div class="network-demo-content">
      
      <!-- Conexiones -->
      <svg class="connections-svg">
        <!-- Conexiones Bitcoin -->
        <line
          v-for="connection in bitcoinConnections"
          :key="`bitcoin-${connection.from}-${connection.to}`"
          :x1="connection.x1" :y1="connection.y1" :x2="connection.x2" :y2="connection.y2"
          stroke="var(--demo-secondary)" stroke-width="2" stroke-dasharray="5,5"
          :style="{ opacity: step >= connection.showAtStep ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }"
        />
        
        <!-- Conexiones P2P -->
        <line
          v-for="connection in p2pConnections"
          :key="`p2p-${connection.from}-${connection.to}`"
          :x1="connection.x1" :y1="connection.y1" :x2="connection.x2" :y2="connection.y2"
          stroke="var(--demo-border)" stroke-width="2" stroke-dasharray="5,5"
          :style="{ opacity: step >= connection.showAtStep ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }"
        />
      </svg>
      
      <!-- Labels P2P -->
      <div 
        v-for="label in p2pLabels" 
        :key="`label-${label.id}`"
        v-if="step >= 6" 
        class="p2p-label" 
        :style="{ left: label.x + 'px', top: label.y + 'px' }"
      >
        P2P
      </div>
      
      <!-- Nodos -->
      <div
        v-for="(node, i) in nodes"
        :key="`node-${i}`"
        class="network-node"
        :class="node.type"
        :style="{
          left: node.position.x + 'px',
          top: node.position.y + 'px',
          opacity: i < 2 ? (step > i ? 1 : 0) : (step >= (node.showAtStep ?? 0) ? 1 : 0),
        }"
      >
        <span class="node-icon">
          <span v-if="node.type === 'bitcoin'">₿</span>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </span>
        <span class="node-name">{{ node.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../i18n/useI18n'

interface Position {
  x: number
  y: number
}

interface NetworkNode {
  name: string
  position: Position
  type: 'bitcoin' | 'lightning'
  showAtStep?: number
}

interface Connection {
  from: number
  to: number
  x1: number
  y1: number
  x2: number
  y2: number
  showAtStep: number
}

interface Label {
  id: string
  x: number
  y: number
}

// Estado reactivo
const step = ref(0)
const isComplete = ref(false)
const containerRef = ref<HTMLElement>()
const containerSize = ref({ width: 600, height: 400 })
const progressAngle = ref(0)
const progressOffset = ref(113.097)

// Internacionalización
const { t, currentLang } = useI18n()

// Definir nodos base (posiciones relativas)
const baseNodes = [
  { name: "Bitcoin Core", x: 0.25, y: 0.25, type: "bitcoin" as const },
  { name: "Bitcoin Core", x: 0.75, y: 0.25, type: "bitcoin" as const },
  { name: "alice", x: 0.25, y: 0.55, type: "lightning" as const, showAtStep: 3 },
  { name: "bob", x: 0.75, y: 0.55, type: "lightning" as const, showAtStep: 4 },
  { name: "carol", x: 0.5, y: 0.85, type: "lightning" as const, showAtStep: 5 },
]

// Nodos calculados dinámicamente
const nodes = computed((): NetworkNode[] => {
  return baseNodes.map((node, index) => ({
    name: node.name,
    position: {
      x: node.x * containerSize.value.width,
      y: node.y * containerSize.value.height
    },
    type: node.type,
    showAtStep: node.showAtStep
  }))
})

// Conexiones Bitcoin calculadas dinámicamente
const bitcoinConnections = computed((): Connection[] => {
  const nodeList = nodes.value
  return [
    {
      from: 2, to: 0, // alice -> Bitcoin Core 1
      x1: nodeList[2].position.x, y1: nodeList[2].position.y,
      x2: nodeList[0].position.x, y2: nodeList[0].position.y,
      showAtStep: 3
    },
    {
      from: 3, to: 1, // bob -> Bitcoin Core 2
      x1: nodeList[3].position.x, y1: nodeList[3].position.y,
      x2: nodeList[1].position.x, y2: nodeList[1].position.y,
      showAtStep: 4
    },
    {
      from: 4, to: 0, // carol -> Bitcoin Core 1
      x1: nodeList[4].position.x, y1: nodeList[4].position.y,
      x2: nodeList[0].position.x, y2: nodeList[0].position.y,
      showAtStep: 5
    }
  ]
})

// Conexiones P2P calculadas dinámicamente
const p2pConnections = computed((): Connection[] => {
  const nodeList = nodes.value
  return [
    {
      from: 2, to: 3, // alice -> bob
      x1: nodeList[2].position.x, y1: nodeList[2].position.y,
      x2: nodeList[3].position.x, y2: nodeList[3].position.y,
      showAtStep: 6
    },
    {
      from: 3, to: 4, // bob -> carol
      x1: nodeList[3].position.x, y1: nodeList[3].position.y,
      x2: nodeList[4].position.x, y2: nodeList[4].position.y,
      showAtStep: 6
    },
    {
      from: 4, to: 2, // carol -> alice
      x1: nodeList[4].position.x, y1: nodeList[4].position.y,
      x2: nodeList[2].position.x, y2: nodeList[2].position.y,
      showAtStep: 6
    }
  ]
})

// Labels P2P calculados dinámicamente
const p2pLabels = computed((): Label[] => {
  const nodeList = nodes.value
  return [
    {
      id: 'alice-bob',
      x: (nodeList[2].position.x + nodeList[3].position.x) / 2,
      y: (nodeList[2].position.y + nodeList[3].position.y) / 2
    },
    {
      id: 'bob-carol',
      x: (nodeList[3].position.x + nodeList[4].position.x) / 2,
      y: (nodeList[3].position.y + nodeList[4].position.y) / 2
    },
    {
      id: 'carol-alice',
      x: (nodeList[4].position.x + nodeList[2].position.x) / 2,
      y: (nodeList[4].position.y + nodeList[2].position.y) / 2
    }
  ]
})

// Definir conexiones (para debug)
const connections = computed(() => {
  return [
    { showAtStep: 3, type: "bitcoin" },
    { showAtStep: 4, type: "bitcoin" },
    { showAtStep: 5, type: "bitcoin" },
    { showAtStep: 6, type: "p2p" },
    { showAtStep: 6, type: "p2p" },
    { showAtStep: 6, type: "p2p" },
  ]
})

// Animación
let animationTimer: number | null = null
let resizeObserver: ResizeObserver | null = null
let progressTimer: number | null = null

const updateContainerSize = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    containerSize.value = {
      width: rect.width,
      height: rect.height
    }
  }
}

const startAnimation = () => {
  if (!isComplete.value) {
    animationTimer = window.setInterval(() => {
      if (step.value === 6) {
        isComplete.value = true
      } else {
        step.value = step.value + 1
      }
    }, 800)
  } else {
    animationTimer = window.setTimeout(() => {
      step.value = 0
      isComplete.value = false
    }, 10000)
  }
}

const stopAnimation = () => {
  if (animationTimer) {
    if (!isComplete.value) {
      clearInterval(animationTimer)
    } else {
      clearTimeout(animationTimer)
    }
    animationTimer = null
  }
}

const startProgressAnimation = () => {
  const duration = 10000 // 10 segundos
  const interval = 50 // Actualizar cada 50ms para suavidad
  const totalSteps = duration / interval
  let currentStep = 0
  
  progressTimer = window.setInterval(() => {
    currentStep++
    const progress = currentStep / totalSteps
    
    // Calcular el offset del stroke (113.097 es la circunferencia completa)
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
  // Resetear el progreso
  progressAngle.value = 0
  progressOffset.value = 113.097
}

const restartAnimation = () => {
  stopAnimation()
  stopProgressAnimation()
  step.value = 0
  isComplete.value = false
  startAnimation()
  startProgressAnimation() // Iniciar el progreso automático
}

onMounted(() => {
  updateContainerSize()
  startAnimation()
  startProgressAnimation() // Iniciar el progreso automático
  
  // Configurar ResizeObserver para responsive
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
.network-demo-container {
  position: relative;
  margin: 0 auto 2rem auto;
  background-color: var(--demo-bg);
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  height: 400px;
  min-height: 300px;
}

.network-demo-header {
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
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
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

.header-spacer {
  width: 40px;
}

.header-text {
  color: var(--demo-accent);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  flex: 1;
  margin: 0 8px;
  line-height: 1.2;
}

.network-demo-content {
  position: absolute;
  inset: 0;
  padding-top: 48px;
}



.connections-svg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.p2p-label {
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: var(--demo-header-bg);
  border: 1px solid var(--demo-border);
  color: var(--demo-muted);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 15;
  pointer-events: none;
}

.network-node {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid;
  font-weight: 500;
  color: var(--demo-node-text);
  z-index: 20;
  width: 120px;
  height: 36px;
  background-color: var(--demo-node-bg);
  transition: all 0.5s ease-in-out;
  transform: translate(-50%, -50%);
}

.network-node[style*="opacity: 0"] {
  transform: translate(-50%, -50%) scale(0.8);
}

.network-node.bitcoin {
  border-color: var(--demo-secondary);
}

.network-node.bitcoin .node-icon {
  color: var(--demo-secondary);
}

.network-node.lightning {
  border-color: var(--demo-accent);
}

.network-node.lightning .node-icon {
  color: var(--demo-accent);
}

.node-icon {
  margin-right: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
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

/* Responsive styles */
@media (max-width: 768px) {
  .network-demo-container {
    height: 350px;
    min-height: 250px;
  }
  
  .network-node {
    width: 100px;
    height: 32px;
    font-size: 12px;
  }
  
  .node-name {
    font-size: 12px;
  }
  
  .node-icon svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 480px) {
  .network-demo-container {
    height: 300px;
    min-height: 200px;
  }
  
  .network-node {
    width: 80px;
    height: 28px;
    font-size: 11px;
  }
  
  .node-name {
    font-size: 11px;
  }
  
  .node-icon svg {
    width: 12px;
    height: 12px;
  }
  
  .header-text {
    font-size: 12px;
  }
}
</style>
