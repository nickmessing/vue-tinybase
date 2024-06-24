import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue TinyBase',
  description: 'Vue + TinyBase Documentation',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started', activeMatch: `^/guide/` },
      { text: 'API', link: '/api', activeMatch: `^/api/` },
    ],

    sidebar: {
      '/guide': [
        {
          text: 'Getting Started',
          items: [
            { text: '1. Create a store', link: '/guide/getting-started/create-a-store' },
            { text: '2. Connect to Vue.js app', link: '/guide/getting-started/connect-to-vuejs-app' },
          ],
        },
        {
          text: 'Usage with TypeScript',
          link: '/guide/usage-with-typescript',
        },
      ],
      '/api': [
        {
          text: 'Store',
          items: [
            { text: 'Composables', link: '/api/store/composables' },
            { text: 'Context', link: '/api/store/context' },
            { text: 'Events', link: '/api/store/events' },
            { text: 'Writable References', link: '/api/store/references' },
          ],
        },
        {
          text: 'Common',
          items: [
            { text: 'Composables', link: '/api/common/composables' },
            { text: 'Types', link: '/api/common/types' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/nickmessing/vue-tinybase' }],

    search: {
      provider: 'local',
    },
  },
})
