import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lightning Network Guide',
  titleTemplate: ':title | LN Guide',
  description: 'Master the Lightning Network with our comprehensive guide. Learn payment channels, BOLT standards, HTLC contracts, and Bitcoin scaling solutions. Fast, secure, and cost-effective micropayments.',
  appearance: true,

  // Enhanced SEO configuration
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://ln.guide',
    transformItems: (items) => {
      return items.map(item => ({
        ...item,
        changefreq: 'weekly',
        priority: item.url === '' || item.url === 'es/' ? 1.0 : 0.8
      }))
    }
  },

  // Dynamic canonical and hreflang per page
  transformPageData(pageData) {
    const relativePath = pageData.relativePath
    let urlPath = relativePath.replace(/\.md$/, '').replace(/index$/, '')

    // Remove trailing slash for non-root paths
    if (urlPath && urlPath.endsWith('/')) {
      urlPath = urlPath.slice(0, -1)
    }

    const isSpanish = urlPath.startsWith('es/')
    const basePath = isSpanish ? urlPath.replace(/^es\/?/, '') : urlPath

    const canonicalUrl = `https://ln.guide/${urlPath}`
    const enUrl = `https://ln.guide/${basePath}`
    const esUrl = `https://ln.guide/es/${basePath}`

    pageData.frontmatter.head ??= []

    // Dynamic canonical
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }]
    )

    // Dynamic hreflang
    pageData.frontmatter.head.push(
      ['link', { rel: 'alternate', hreflang: 'en', href: enUrl }],
      ['link', { rel: 'alternate', hreflang: 'es', href: esUrl }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: enUrl }]
    )
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
    // Note: title, description, and keywords are now set per-page via frontmatter
    ['meta', { name: 'title', content: 'Lightning Network' }],
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
    
    // Note: Canonical and hreflang are now dynamically generated per page via transformPageData

    // Google Search Console verification (replace YOUR_GSC_CODE with actual code)
    // ['meta', { name: 'google-site-verification', content: 'YOUR_GSC_CODE' }],
    
    // Favicon and app icons
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    ['link', { rel: 'mask-icon', href: '/favicon.svg', color: '#8b5cf6' }],
    
    // Preconnect for performance
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    
    // Structured data for rich snippets - WebSite schema
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Lightning Network Guide",
      "alternateName": [
        "LN Guide",
        "ln.guide",
        "Lightning Guide",
        "Guía Lightning Network",
        "Guía Lightning",
        "LN Guide Español",
        "Lightning Network Tutorial",
        "Bitcoin Lightning Guide"
      ],
      "description": "Complete bilingual guide to the Lightning Network - Bitcoin's Layer 2 scaling solution. The definitive LN Guide available in English and Spanish at ln.guide.",
      "url": "https://ln.guide",
      "inLanguage": ["en", "es"],
      "dateModified": "2025-01-12",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ln.guide/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ln.guide",
        "url": "https://ln.guide",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ln.guide/logo.png",
          "width": 512,
          "height": 512
        }
      },
      "keywords": "lightning network guide, ln guide, lightning guide, ln.guide, lightning network tutorial, bitcoin layer 2, payment channels, htlc, bolt standards"
    })],

    // LearningResource schema for educational content
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": "Lightning Network Guide",
      "alternateName": ["LN Guide", "Lightning Guide", "ln.guide", "Guía Lightning Network"],
      "description": "Comprehensive bilingual educational guide about Lightning Network, Bitcoin's Layer 2 scaling solution. Learn payment channels, HTLC contracts, BOLT standards, and channel management. The definitive LN Guide at ln.guide.",
      "url": "https://ln.guide",
      "inLanguage": ["en", "es"],
      "learningResourceType": "Guide",
      "educationalLevel": "Beginner to Advanced",
      "keywords": "lightning network guide, ln guide, lightning guide, bitcoin layer 2, payment channels tutorial, htlc explained, bolt standards",
      "audience": {
        "@type": "Audience",
        "audienceType": "Bitcoin developers, cryptocurrency enthusiasts, fintech professionals"
      },
      "author": {
        "@type": "Organization",
        "name": "ln.guide",
        "url": "https://ln.guide"
      },
      "datePublished": "2024-01-01",
      "dateModified": "2025-01-11",
      "isAccessibleForFree": true,
      "teaches": [
        "Lightning Network fundamentals",
        "Payment channel mechanics",
        "HTLC contracts",
        "BOLT protocol standards",
        "Channel capacity management",
        "Lightning node operation"
      ],
      "assesses": "Understanding of Bitcoin Layer 2 scaling solutions",
      "competencyRequired": "Basic understanding of Bitcoin",
      "timeRequired": "PT2H",
      "interactivityType": "mixed",
      "image": "https://ln.guide/logo.png"
    })],

    // TechArticle schema for technical documentation
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Lightning Network Guide - Complete LN Guide",
      "alternativeHeadline": "The Definitive Lightning Guide - Bitcoin Layer 2 Tutorial at ln.guide",
      "description": "In-depth technical documentation covering Lightning Network architecture, payment channels, HTLC contracts, and BOLT specifications. Your complete Lightning Network Guide at ln.guide.",
      "url": "https://ln.guide",
      "inLanguage": ["en", "es"],
      "author": {
        "@type": "Organization",
        "name": "ln.guide",
        "url": "https://ln.guide"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ln.guide",
        "url": "https://ln.guide",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ln.guide/logo.png"
        }
      },
      "datePublished": "2024-01-01",
      "dateModified": "2025-01-11",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://ln.guide"
      },
      "articleSection": ["Bitcoin", "Lightning Network", "Layer 2", "Cryptocurrency", "LN Guide"],
      "keywords": "lightning network guide, ln guide, lightning guide, ln.guide, bitcoin layer 2, payment channels, htlc, bolt, cryptocurrency scaling, lightning network tutorial",
      "proficiencyLevel": "Beginner to Expert",
      "dependencies": "Basic Bitcoin knowledge",
      "image": "https://ln.guide/logo.png"
    })],

    // Organization schema
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ln.guide",
      "alternateName": ["LN Guide", "Lightning Network Guide", "Lightning Guide"],
      "url": "https://ln.guide",
      "logo": "https://ln.guide/logo.png",
      "description": "Educational resource for Lightning Network - Bitcoin's Layer 2 scaling solution. The definitive Lightning Network Guide.",
      "sameAs": [
        "https://github.com/lightning-guide",
        "https://twitter.com/lightning_guide"
      ],
      "knowsAbout": ["Lightning Network", "Bitcoin", "Payment Channels", "Cryptocurrency", "HTLC", "BOLT Standards"],
      "areaServed": "Worldwide"
    })],

    // FAQ Schema for common Lightning Network questions
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Lightning Network?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lightning Network is a Layer 2 scaling solution for Bitcoin that enables fast, low-cost payments through payment channels. It operates off-chain and only settles on the Bitcoin blockchain when channels are opened or closed."
          }
        },
        {
          "@type": "Question",
          "name": "What is a Lightning Network Guide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Lightning Network Guide (LN Guide) is an educational resource that explains how Lightning Network works, including payment channels, HTLC contracts, BOLT standards, and channel management. ln.guide provides a complete bilingual guide in English and Spanish."
          }
        },
        {
          "@type": "Question",
          "name": "How do Lightning payment channels work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lightning payment channels are created when two parties lock Bitcoin in a multisig address on the blockchain. They can then exchange unlimited transactions off-chain by updating the channel balance. When either party wants to close the channel, the final balance is settled on-chain."
          }
        },
        {
          "@type": "Question",
          "name": "What are HTLC contracts in Lightning Network?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HTLC (Hash Time-Locked Contracts) are smart contracts that enable trustless routing of payments across multiple Lightning channels. They use cryptographic hashes and time locks to ensure payments either complete successfully or are refunded."
          }
        },
        {
          "@type": "Question",
          "name": "What are BOLT standards?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BOLT (Basis of Lightning Technology) standards are the technical specifications that define how Lightning Network implementations should work. They cover messaging protocols, channel operations, payment routing, and invoice formats."
          }
        }
      ]
    })],

    // BreadcrumbList schema for navigation
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Lightning Network Guide",
          "item": "https://ln.guide"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "How Lightning Works",
          "item": "https://ln.guide/how-its-work"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Payment Channels",
          "item": "https://ln.guide/channels"
        }
      ]
    })],
    
    // Language detection removed for SEO - users can manually switch languages via nav
    // Automatic redirects interfere with Googlebot crawling and cause indexation issues
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
