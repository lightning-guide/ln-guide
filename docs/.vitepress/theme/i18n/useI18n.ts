import { ref, computed } from 'vue'
import { useRoute } from 'vitepress'
import esTranslations from './translations-es.json'
import enTranslations from './translations-en.json'

// Tipos para las traducciones
type TranslationKey = string
type TranslationValue = string | Record<string, any>

interface Translations {
  [key: string]: TranslationValue
}

// Función para obtener traducción anidada usando dot notation
function getNestedTranslation(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path
  }, obj) as string
}

// Función para interpolar variables en las traducciones
function interpolateTranslation(text: string, params: Record<string, any> = {}): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match
  })
}

export function useI18n() {
  const route = useRoute()
  
  // Detectar idioma basado en la ruta
  const currentLang = computed(() => {
    const path = route.path
    return path.startsWith('/es/') || path === '/es' ? 'es' : 'en'
  })
  
  // Obtener traducciones según el idioma
  const translations = computed((): Translations => {
    return currentLang.value === 'es' ? esTranslations : enTranslations
  })
  
  // Función para traducir
  const t = (key: TranslationKey, params?: Record<string, any>): string => {
    const translation = getNestedTranslation(translations.value, key)
    if (typeof translation === 'string') {
      return interpolateTranslation(translation, params)
    }
    return key
  }
  
  return {
    currentLang,
    t,
    translations
  }
}
