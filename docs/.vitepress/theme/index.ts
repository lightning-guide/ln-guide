import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import NetworkDemo from './components/NetworkDemo.vue'
import ChannelDemo from './components/ChannelDemo.vue'
import ChannelOpeningDemo from './components/ChannelOpeningDemo.vue'
import RoutingDemo from './components/RoutingDemo.vue'
import ChannelUpdateDemo from './components/ChannelUpdateDemo.vue'
import { inject } from '@vercel/analytics'
import { inBrowser } from 'vitepress'

// Initialize Vercel Analytics
inject()

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }: { app: any; }) {
    // Register components
    app.component('NetworkDemo', NetworkDemo)
    app.component('ChannelDemo', ChannelDemo)
    app.component('ChannelOpeningDemo', ChannelOpeningDemo)
    app.component('RoutingDemo', RoutingDemo)
    app.component('ChannelUpdateDemo', ChannelUpdateDemo)
    
    // Language preference management (client-side only)
    if (inBrowser) {
      const originalPushState = history.pushState
      history.pushState = function(...args) {
        const url = args[2]
        if (url && typeof url === 'string') {
          if (url.startsWith('/es/')) {
            localStorage.setItem('vp-lang', 'es')
          } else {
            localStorage.setItem('vp-lang', 'en')
          }
        }
        
        return originalPushState.apply(this, args)
      }
    }
  }
}
