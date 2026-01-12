<template>
  <div class="lightning-logo" role="img" aria-label="Lightning Network Guide Logo">
    <svg class="lightning-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="0.5"
      />
    </svg>
    <span class="logo-text">Lightning Guide</span>
  </div>
</template>

<script setup>
// No props needed for this simple logo component
</script>

<style scoped>
.lightning-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.25rem;
  color: #f3f4f6;
}

.lightning-icon {
  width: 24px;
  height: 24px;
  color: #7c3aed;
  filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.4));
  animation: lightning-glow 2s ease-in-out infinite alternate;
}

.logo-text {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -0.025em;
}

@keyframes lightning-glow {
  0% {
    filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.4));
  }
  100% {
    filter: drop-shadow(0 0 12px rgba(124, 58, 237, 0.6));
  }
}

/* Dark mode adjustments */
.dark .lightning-icon {
  color: #a855f7;
}

.dark .logo-text {
  background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
