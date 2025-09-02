<template>
  <div class="channel-demo-container" ref="containerRef">
    <div class="channel-demo-header">
      <div class="header-spacer"></div>
      <p class="header-text" :key="textAnimationKey" :class="{ 'animate-text-explode': textAnimationKey > 0 }">
        {{ descriptionText }}
      </p>
      <button @click="restartAnimation" class="restart-button" :title="t('channelUpdateDemo.restartButton')">
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
      <!-- Caja multifirma superior -->
      <div ref="multisigRef" class="multisig-box" :class="{ 'opacity-100': step >= 1, 'opacity-0 translate-y-2': step < 1 }"
           :style="{ left: positions.centerX + 'px', top: positions.multisigY + 'px', width: sizes.multisigWidth + 'px' }">
        <div class="multisig-header">
          <svg class="wallet-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="6" width="18" height="12" rx="2" ry="2"/>
            <path d="M16 12h5"/>
          </svg>
          <span>{{ t('channelUpdateDemo.multisigTitle') }}</span>
        </div>
        <div class="multisig-balance">Balance: {{ formatBalance(1_000_000) }} sats</div>
      </div>

      <!-- Canal -->
      <svg class="channel-line">
        <line
          :x1="nodes[0].position.x"
          :y1="positions.channelY"
          :x2="nodes[1].position.x"
          :y2="positions.channelY"
          stroke="var(--demo-accent)" stroke-width="3" stroke-linecap="round"
        />
      </svg>

      <!-- Flecha de transferencia y logo BTC (durante la actualización de balances) -->
      <div v-if="step >= 5" class="arrow-container"
           :style="{ left: transferArrow.x + 'px', top: transferArrow.y + 'px', transform: 'translate(-50%, -50%)' }">
        <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12,5 19,12 12,19"></polyline>
        </svg>
      </div>
      <div v-if="step >= 5" class="btc-logo-container"
           :style="{ left: transferArrow.x + 'px', top: transferArrow.y + 'px' }">
        <svg class="btc-icon" viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
          <circle cx="16" cy="16" r="12" fill="#f7931a" />
          <text x="16" y="21" text-anchor="middle" font-size="16" font-weight="700" fill="#ffffff">₿</text>
        </svg>
      </div>

      <!-- Nodos -->
      <div v-for="(node, i) in nodes" :key="`upd-node-${i}`" class="channel-node"
           :style="{ left: node.position.x + 'px', top: node.position.y + 'px', width: sizes.nodeWidth + 'px', height: sizes.nodeHeight + 'px' }"
           :ref="(el) => setNodeRef(el, i)">
        <span class="node-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </span>
        <span class="node-name" :style="{ fontSize: sizes.fontSize }">{{ node.name }}</span>
      </div>

      <!-- Capacidades (antes y después) -->
      <!-- Alice -->
      <div class="capacity-text"
           :class="{ 'capacity-old moved-up': step >= 5 }"
           :style="{ left: nodes[0].position.x + 'px', top: (positions.channelY - 41) + 'px', fontSize: sizes.fontSize }">
        {{ formatBalance(500_000) }} sats →
      </div>
      <div v-if="step >= 5" class="capacity-text updated fade-in"
           :style="{ left: nodes[0].position.x + 'px', top: (positions.channelY - 41) + 'px', fontSize: sizes.fontSize }">
        {{ formatBalance(400_000) }} sats →
      </div>

      <!-- Bob -->
      <div class="capacity-text"
           :class="{ 'capacity-old moved-up': step >= 5 }"
           :style="{ left: nodes[1].position.x + 'px', top: (positions.channelY - 41) + 'px', fontSize: sizes.fontSize }">
        ← {{ formatBalance(500_000) }} sats
      </div>
      <div v-if="step >= 5" class="capacity-text updated fade-in"
           :style="{ left: nodes[1].position.x + 'px', top: (positions.channelY - 41) + 'px', fontSize: sizes.fontSize }">
        ← {{ formatBalance(600_000) }} sats
      </div>

      <!-- Caja de firma -->
      <div ref="signatureRef" id="signature-box" class="signature-box"
           :class="{ 'opacity-100 translate-y-0': step >= 1, 'opacity-0 translate-y-2': step < 1 }"
           :style="{ left: positions.centerX + 'px', top: positions.signatureY + 'px' }">
        <div class="signature-inner">
          <div class="sig-title">{{ t('channelUpdateDemo.signatureTitle') }}</div>
          <div class="sig-sub">{{ t('channelUpdateDemo.signatureSub', { amount: formatBalance(100_000) }) }}</div>
          <div class="sig-balances">
            <div>Alice: {{ formatBalance(400_000) }} sats</div>
            <div>Bob: {{ formatBalance(600_000) }} sats</div>
          </div>
          <div class="sig-badges">
            <div class="sig-badge" :class="{ active: step >= 3 }">
              <svg viewBox="-2 -2 28 28" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" aria-hidden="true">
                <circle cx="6" cy="18" r="3.2" />
                <path d="M9 15 L 17 7" />
                <path d="M17 7 H 21" />
                <path d="M17 7 V 11" />
              </svg>
              <span>{{ t('channelUpdateDemo.aliceSignature') }}</span>
            </div>
            <div class="sig-badge" :class="{ active: step >= 4 }">
              <svg viewBox="-2 -2 28 28" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" aria-hidden="true">
                <circle cx="6" cy="18" r="3.2" />
                <path d="M9 15 L 17 7" />
                <path d="M17 7 H 21" />
                <path d="M17 7 V 11" />
              </svg>
              <span>{{ t('channelUpdateDemo.bobSignature') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Flechas a la caja de firma (LeaderLine) -->
      <div v-if="showSignArrows" class="leader-lines-layer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useI18n } from '../i18n/useI18n'

interface Position { x: number; y: number }
interface ChannelNode { name: string; position: Position }

const step = ref(0)
const containerRef = ref<HTMLElement>()
const containerSize = ref({ width: 600, height: 580 })
const progressOffset = ref(113.097)
const textAnimationKey = ref(0)

// Internacionalización
const { t } = useI18n()

const multisigRef = ref<HTMLElement>()
const signatureRef = ref<HTMLElement>()
const nodeRefs = ref<HTMLElement[]>([])

let animationTimer: number | null = null
let resizeObserver: ResizeObserver | null = null
let animationStart: number | null = null
let lineAlice: any = null, lineBob: any = null, lineMulti: any = null
let linesActive = false

const updateContainerSize = () => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  containerSize.value = { width: rect.width, height: rect.height }
}

const positions = computed(() => {
  const w = containerSize.value.width
  const h = containerSize.value.height
  const headerHeight = 44
  const contentH = h - headerHeight
  const centerX = w / 2
  const channelY = headerHeight + contentH * 0.45
  const signatureY = headerHeight + contentH * 0.85
  const multisigY = headerHeight + contentH * 0.18
  const spacing = w < 480 ? w * 0.32 : w * 0.35
  return { centerX, channelY, signatureY, multisigY, aliceX: centerX - spacing, bobX: centerX + spacing }
})

type SizeInfo = { nodeWidth: number; nodeHeight: number; fontSize: string; multisigWidth: number }
const sizes = computed<SizeInfo>(() => {
  const w = containerSize.value.width
  if (w < 400) return { nodeWidth: 80, nodeHeight: 32, fontSize: '12px', multisigWidth: 160 }
  if (w < 600) return { nodeWidth: 100, nodeHeight: 36, fontSize: '12px', multisigWidth: 180 }
  if (w < 768) return { nodeWidth: 120, nodeHeight: 40, fontSize: '14px', multisigWidth: 200 }
  if (w < 1024) return { nodeWidth: 140, nodeHeight: 44, fontSize: '14px', multisigWidth: 220 }
  return { nodeWidth: 160, nodeHeight: 48, fontSize: '14px', multisigWidth: 240 }
})

const nodes = computed<ChannelNode[]>(() => [
  { name: 'Alice', position: { x: positions.value.aliceX, y: positions.value.channelY } },
  { name: 'Bob', position: { x: positions.value.bobX, y: positions.value.channelY } },
])

const descriptionText = computed(() => {
  if (step.value < 1) return t('channelUpdateDemo.header')
  if (step.value < 2) return t('channelUpdateDemo.step1')
  if (step.value < 3) return t('channelUpdateDemo.step2')
  if (step.value < 4) return t('channelUpdateDemo.step3')
  if (step.value < 5) return t('channelUpdateDemo.step4')
  return t('channelUpdateDemo.step5')
})

watch(descriptionText, (n, o) => { if (n !== o) textAnimationKey.value++ })

const formatBalance = (balance: number) => {
  if (balance >= 1_000_000) return `${(balance / 1_000_000).toFixed(1)}M`
  if (balance >= 1_000) return `${(balance / 1_000).toFixed(0)}k`
  return `${balance}`
}

// Flecha de transferencia durante la actualización de balances
const transferArrow = computed(() => {
  if (step.value < 5) return { x: 0, y: 0 }
  const local = Math.min(1, Math.max(0, (step.value - 5)))
  const startX = nodes.value[0].position.x + sizes.value.nodeWidth/2 + 20
  const endX = nodes.value[1].position.x - sizes.value.nodeWidth/2 - 20
  const x = startX + (endX - startX) * local
  const y = positions.value.channelY
  return { x, y }
})

// Animación principal timeline
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
      progress < 1000 ? 0 :
      progress < 2500 ? 1 :
      progress < 3500 ? 2 :
      progress < 5000 ? 3 :
      progress < 6500 ? 4 :
      progress < 9000 ? 5 + (progress - 6500) / 2500 : 6

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
  destroyLines()
  startAnimation()
}

onMounted(() => {
  updateContainerSize()
  resizeObserver = new ResizeObserver(() => updateContainerSize())
  if (containerRef.value) resizeObserver.observe(containerRef.value)
  window.addEventListener('resize', positionLines, { passive: true })
  document.addEventListener('scroll', positionLines, { passive: true, capture: true })
  startAnimation()
})

onUnmounted(() => {
  if (animationTimer) cancelAnimationFrame(animationTimer)
  if (resizeObserver) resizeObserver.disconnect()
  window.removeEventListener('resize', positionLines as any)
  document.removeEventListener('scroll', positionLines as any, true)
  destroyLines()
})

const setNodeRef = (el: Element | null, idx: number) => { if (el) nodeRefs.value[idx] = el as HTMLElement }

const showSignArrows = computed(() => step.value >= 2 && step.value < 5)

watch(showSignArrows, async (v) => {
  if (v) {
    await nextTick()
    if (!linesActive) await setupLines()
    positionLines()
  } else {
    destroyLines()
  }
})

async function setupLines() {
  if (typeof window === 'undefined') return
  const { default: LeaderLine } = await import('leader-line-new')
  if (!nodeRefs.value[0] || !nodeRefs.value[1] || !signatureRef.value || !multisigRef.value) return
  const aliceEl = nodeRefs.value[0]
  const bobEl = nodeRefs.value[1]
  const sigEl = signatureRef.value
  const multiEl = multisigRef.value
  const isDark = document.documentElement.classList.contains('dark')
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--demo-accent')?.trim() || '#a78bfa'

  lineAlice = new LeaderLine(LeaderLine.pointAnchor(aliceEl, { x: '50%', y: '100%' }), LeaderLine.pointAnchor(sigEl, { x: '50%', y: 0 }),
    { color: accentColor, size: 3, path: 'grid', startSocket: 'bottom', endSocket: 'top', endPlug: 'arrow3', endPlugSize: 1.6, dropShadow: isDark })
  lineBob = new LeaderLine(LeaderLine.pointAnchor(bobEl, { x: '50%', y: '100%' }), LeaderLine.pointAnchor(sigEl, { x: '50%', y: 0 }),
    { color: accentColor, size: 3, path: 'grid', startSocket: 'bottom', endSocket: 'top', endPlug: 'arrow3', endPlugSize: 1.6, dropShadow: isDark })
  lineMulti = new LeaderLine(LeaderLine.pointAnchor(multiEl, { x: '50%', y: '100%' }), LeaderLine.pointAnchor(sigEl, { x: '50%', y: 0 }),
    { color: accentColor, size: 3, path: 'grid', startSocket: 'bottom', endSocket: 'top', endPlug: 'arrow3', endPlugSize: 1.6, dropShadow: isDark })
  linesActive = true
  try { lineAlice.hide('none'); lineBob.hide('none'); lineMulti.hide('none'); lineAlice.show('draw', { duration: 800 }); lineBob.show('draw', { duration: 800 }); lineMulti.show('draw', { duration: 800 }) } catch {}
}

function destroyLines() {
  try { lineAlice && lineAlice.hide('fade', { duration: 200 }) } catch {}
  try { lineBob && lineBob.hide('fade', { duration: 200 }) } catch {}
  try { lineMulti && lineMulti.hide('fade', { duration: 200 }) } catch {}
  setTimeout(() => { try { lineAlice && lineAlice.remove() } catch {}; try { lineBob && lineBob.remove() } catch {}; try { lineMulti && lineMulti.remove() } catch {} }, 210)
  lineAlice = null; lineBob = null; lineMulti = null; linesActive = false
}

function positionLines() {
  try { lineAlice && lineAlice.position() } catch {}
  try { lineBob && lineBob.position() } catch {}
  try { lineMulti && lineMulti.position() } catch {}
}
</script>

<style scoped>
.channel-demo-container { position: relative; margin: 0 auto 2rem auto; background-color: var(--demo-bg); border-radius: 8px; overflow: hidden; width: 100%; max-width: 600px; height: 600px; min-height: 440px; }
.channel-demo-container { z-index: 0; }
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
.channel-line { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }
.opacity-0 { opacity: 0; } .opacity-100 { opacity: 1; }

.arrow-container { position: absolute; z-index: 15; pointer-events: none; }
.arrow-icon { color: var(--demo-accent); width: 24px; height: 24px; }
.btc-logo-container { position: absolute; z-index: 16; pointer-events: none; transform: translate(-50%, -140%); }
.btc-icon { display: block; }

.channel-node { position: absolute; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 2px solid var(--demo-accent); font-weight: 500; color: var(--demo-node-text); z-index: 20; background-color: var(--demo-node-bg); transition: all 0.5s ease-in-out; transform: translate(-50%, -50%); padding: 0 8px; }
.node-icon { margin-right: 4px; display: flex; align-items: center; color: var(--demo-accent); }
.node-icon svg { width: 16px; height: 16px; }
.node-name { white-space: nowrap; font-size: 14px; }

.capacity-text { position: absolute; transform: translateX(-50%); color: var(--demo-capacity-text); font-size: 12px; font-weight: 500; white-space: nowrap; z-index: 25; pointer-events: none; transition: all 0.3s ease; }
.capacity-text.updated { color: #c4b5fd; }
.capacity-text.capacity-old { text-decoration: line-through; opacity: 0.6; }
.capacity-text.capacity-old.moved-up { transform: translate(-50%, -14px); opacity: 0.6; transition: transform 400ms ease, opacity 300ms ease; }
.capacity-text.updated.fade-in { animation: fadeInCapacity 420ms ease-out 1; }
@keyframes fadeInCapacity { from { opacity: 0; } to { opacity: 1; } }

.multisig-box { position: absolute; transform: translate(-50%, -50%); background-color: var(--demo-header-bg); border: 1px solid var(--demo-accent); border-radius: 8px; color: var(--demo-text); padding: 8px 12px; transition: all 0.4s ease; }
.multisig-header { display: inline-flex; align-items: center; justify-content: center; gap: 8px; color: #c4b5fd; font-size: 12px; margin-bottom: 4px; width: 100%; }
.wallet-icon { width: 24px; height: 26px; color: #a78bfa; display: inline-block; vertical-align: middle; }
.multisig-balance { font-size: 12px; color: #9ca3af; text-align: center; }

.signature-box { position: absolute; transform: translate(-50%, -50%); transition: all 0.4s ease; }
/* Light Mode: hacerla similar a la caja de multifirma */
.signature-inner { padding: 12px 16px; background-color: var(--demo-header-bg); border: 1px solid var(--demo-accent); border-radius: 8px; min-width: 320px; text-align: center; transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease; box-shadow: 0 1px 2px rgba(17,24,39,0.04); }
/* Dark Mode: conservar estilo original más destacado */
.dark .signature-inner { background-color: #1f2937; border: 1px solid rgba(167,139,250,0.45); box-shadow: 0 0 22px 6px rgba(167,139,250,0.12); background-image: radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.08), transparent 65%); }
@keyframes badgeGlow { 0% { box-shadow: 0 0 0 0 rgba(167,139,250,0.55); transform: scale(1); } 60% { box-shadow: 0 0 18px 8px rgba(167,139,250,0.35); transform: scale(1.04); } 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0); transform: scale(1); } }
.sig-title { color: var(--demo-accent); font-size: 13px; margin-bottom: 6px; white-space: nowrap; }
.sig-sub { color: var(--demo-muted); font-size: 12px; margin-bottom: 6px; white-space: nowrap; }
.sig-balances { display: flex; gap: 12px; justify-content: center; color: var(--demo-muted); font-size: 12px; white-space: nowrap; }
.sig-badges { margin-top: 6px; display: flex; gap: 12px; justify-content: center; }
.sig-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; padding: 3px 10px; border-radius: 9999px; background-color: rgba(55,65,81,0.12); color: var(--demo-muted); transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease; }
.sig-badge svg { width: 14px; height: 14px; flex-shrink: 0; transform: translateY(0.5px); }
.sig-badge.active { background-color: rgba(167,139,250,0.18); color: var(--demo-accent); animation: badgeGlow 1100ms ease-out 1; }

@media (max-width: 768px) { .channel-demo-container { height: 560px; min-height: 420px; } .signature-inner { min-width: 300px; } }
@media (max-width: 480px) { .channel-demo-container { height: 520px; min-height: 380px; } .header-text { font-size: 12px; } .signature-inner { min-width: 280px; } }
</style>


