import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'html'],
      include: ['packages/public/vue-tinybase/src/**/*.ts'],
      exclude: ['packages/public/vue-tinybase/src/**/index.ts'],
    },
  },
})
