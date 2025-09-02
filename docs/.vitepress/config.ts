import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lightning Network',
  description: 'Master the Lightning Network with our comprehensive guide. Learn payment channels, BOLT standards, HTLC contracts, and Bitcoin scaling solutions. Fast, secure, and cost-effective micropayments.',
  appearance: true,

  // Enhanced SEO configuration
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://ln.guide'
  },

  // Markdown configuration
  markdown: {
    html: true
  },

  // Theme configuration
  themeConfig: {
    outline: 'deep',
    outlineTitle: 'On this page',
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lightning-guide' },
      { icon: 'twitter', link: 'https://twitter.com/lightning_guide' },
    ]
  },

  // i18n configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        sidebar: [
          {
            text: 'Basic Guide',
            items: [
              { text: 'Introduction', link: '/' },
              { text: 'How it works', link: '/how-its-work' },
              { text: 'Payment channels', link: '/channels' },
              { text: 'Channel capacity', link: '/capacity' },
              { text: 'Channel closure', link: '/channel-closure' }
            ]
          },
          {
            text: 'Advanced Guide',
            items: [
              { text: 'BOLT Standards', link: '/bolt-standards' },
            ]
          }
        ],
        nav: [
          { text: 'Lightning Network', link: '/' },
          { text: 'Nostr', link: '/nostr' },
        ]
      }
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      themeConfig: {
        sidebar: [
          {
            text: 'Guía básica',
            items: [
              { text: 'Introducción', link: '/es/' },
              { text: 'Cómo funciona', link: '/es/how-its-work' },
              { text: 'Canales de pago', link: '/es/channels' },
              { text: 'Capacidad de canales', link: '/es/capacity' },
              { text: 'Cierre de canales', link: '/es/channel-closure' }
            ]
          },
          {
            text: 'Guía avanzada',
            items: [
              { text: 'Estándar BOLT', link: '/es/bolt-standards' },
            ]
          }
        ],
        nav: [
          { text: 'Lightning Network', link: '/es' },
          { text: 'Nostr', link: '/es/nostr' },
        ]
      }
    }
  },

  // Enhanced Head configuration for maximum SEO
  head: [
    // Basic meta tags
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    
    // Primary SEO meta tags
    ['meta', { name: 'title', content: 'Lightning Network' }],
    ['meta', { name: 'description', content: 'Master the Lightning Network with our comprehensive guide. Learn payment channels, BOLT standards, HTLC contracts, and Bitcoin scaling solutions. Fast, secure, and cost-effective micropayments.' }],
    ['meta', { name: 'keywords', content: 'Lightning Network, Bitcoin, Layer 2, payment channels, micropayments, BOLT standards, HTLC contracts, Bitcoin scaling, cryptocurrency, blockchain, digital payments, instant payments, low fees, Bitcoin Lightning, LN, payment routing, channel capacity, channel closure' }],
    ['meta', { name: 'author', content: 'Lightning Network Guide' }],
    ['meta', { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://ln.guide' }],
    ['meta', { property: 'og:title', content: 'Lightning Network Guide' }],
    ['meta', { property: 'og:description', content: 'Master the Lightning Network with our comprehensive guide. Learn payment channels, BOLT standards, HTLC contracts, and Bitcoin scaling solutions. Fast, secure, and cost-effective micropayments.' }],
    ['meta', { property: 'og:image', content: 'https://ln.guide/logo.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Lightning Network Guide' }],
    ['meta', { property: 'og:site_name', content: 'Lightning Network Guide' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@lightning_guide' }],
    ['meta', { name: 'twitter:creator', content: '@lightning_guide' }],
    ['meta', { name: 'twitter:title', content: 'Lightning Network Guide' }],
    ['meta', { name: 'twitter:description', content: 'Master the Lightning Network with our comprehensive guide. Learn payment channels, BOLT standards, HTLC contracts, and Bitcoin scaling solutions.' }],
    ['meta', { name: 'twitter:image', content: 'https://ln.guide/logo.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'Lightning Network Guide' }],
    
    // WhatsApp specific meta
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:secure_url', content: 'https://ln.guide/logo.png' }],
    
    // Additional social media optimizations
    ['meta', { name: 'theme-color', content: '#8b5cf6' }],
    ['meta', { name: 'msapplication-TileColor', content: '#8b5cf6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Lightning Network' }],
    
    // Canonical and alternate languages
    ['link', { rel: 'canonical', href: 'https://ln.guide' }],
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://ln.guide' }],
    ['link', { rel: 'alternate', hreflang: 'es', href: 'https://ln.guide/es/' }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://ln.guide' }],
    
    // Favicon and app icons
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    ['link', { rel: 'mask-icon', href: '/favicon.svg', color: '#8b5cf6' }],
    
    // Preconnect for performance
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    
    // Structured data for rich snippets
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Lightning Network Guide",
      "description": "Complete guide to the Lightning Network - Bitcoin's Layer 2 scaling solution",
      "url": "https://ln.guide",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ln.guide/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Lightning Network Guide",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ln.guide/logo.png"
        }
      }
    })],
    
    // Language detection script
    ['script', {}, `
      (function() {
        try {
          // Get saved language preference
          const savedLang = localStorage.getItem('vp-lang')
          
          // Get browser language
          const browserLang = navigator.language.split('-')[0]
          
          // Determine target language
          let targetLang = 'en' // default
          let shouldSave = false
          
          if (savedLang) {
            // User has a saved preference
            targetLang = savedLang
          } else {
            // No saved preference, detect from browser
            shouldSave = true
            if (browserLang === 'es') {
              // Browser prefers Spanish
              targetLang = 'es'
            }
          }
          
          // Save the preference if needed
          if (shouldSave) {
            localStorage.setItem('vp-lang', targetLang)
          }
          
          //Check if we need to redirect
           const currentPath = window.location.pathname
           const isOnSpanishPath = currentPath.startsWith('/es/')
           
           if (targetLang === 'es' && !isOnSpanishPath) {
             // Redirect to Spanish version
             const spanishPath = currentPath === '/' || currentPath === '/index.html' 
               ? '/es/' 
               : '/es' + currentPath
             window.location.href = spanishPath
           } else if (targetLang === 'en' && isOnSpanishPath) {
             // Redirect to English version
             const englishPath = currentPath.replace('/es/', '/').replace('/es', '/')
             window.location.href = englishPath
           }
        } catch (error) {
          // Silent fail for production
        }
      })()
    `]
  ],

  // CSS variables for theming
  vite: {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `
            :root {
              /* Brand */
              --vp-c-brand-1: #a78bfa;
              --vp-c-brand-2: #8b5cf6;
              --vp-c-brand-3: #7c3aed;
              --vp-c-brand-soft: rgba(167, 139, 250, 0.16);

              /* Light mode: align with VitePress site */
              --vp-c-bg: #ffffff;
              --vp-c-bg-alt: #f6f6f7;   /* sidebar */
              --vp-c-bg-elv: #ffffff;   /* elevated cards */
              --vp-c-bg-soft: #f6f6f7;  /* content boxes */

              /* Text (higher contrast, black-ish) */
              --vp-c-text-1: #111827;
              --vp-c-text-2: #1f2937;
              --vp-c-text-3: #4b5563;

              /* Borders/dividers */
              --vp-c-divider: #e5e7eb;
              --vp-c-border: #e5e7eb;
              --vp-c-border-soft: #edeef0;

              /* Sidebar explicit var used by theme */
              --vp-sidebar-bg: var(--vp-c-bg-alt);
            }
            
            .dark {
              --vp-c-brand-1: #a78bfa;
              --vp-c-brand-2: #8b5cf6;
              --vp-c-brand-3: #7c3aed;
              --vp-c-brand-soft: rgba(167, 139, 250, 0.18);
              --vp-c-bg: #171717;
              --vp-c-bg-alt: #1b1b1f;   /* sidebar dark */
              --vp-c-bg-elv: #1f2937;
              --vp-c-bg-soft: #202127;
              --vp-c-text-1: #f3f4f6;
              --vp-c-text-2: #e5e7eb;
              --vp-c-text-3: #9ca3af;
              --vp-c-divider: #2f3138;
              --vp-c-border: #2f3138;
              --vp-c-border-soft: #3a3d45;
              --vp-sidebar-bg: var(--vp-c-bg-alt);
            }
          `
        }
      }
    },
  }
})
