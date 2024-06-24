import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue TinyBase',
  description: 'Vue + TinyBase Documentation',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' },
    ],

    sidebar: {
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
