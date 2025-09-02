<template>
  <div>
    <DefaultTheme.Layout />
    <footer class="vp-footer">
      <div class="vp-footer-content">
        <span v-if="currentLang === 'en'" class="footer-text">
          <svg class="lightning-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Donations via Lightning: donate@ln.guide
        </span>
        <span v-else class="footer-text">
          <svg class="lightning-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Donaciones vía Lightning: donate@ln.guide
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'

const route = useRoute()
const currentLang = computed(() => route.path.startsWith('/es/') ? 'es' : 'en')
</script>

<style scoped>
.vp-footer {
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  padding: 1rem 0;
  margin-top: 2rem;
  text-align: center;
}

.vp-footer-content {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.footer-text {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.lightning-icon {
  flex-shrink: 0;
}
</style>
