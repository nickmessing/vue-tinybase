import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'html'],
      include: ['packages/public/vue-tinybase/src/**/*.ts'],
      exclude: [
        'packages/public/vue-tinybase/src/**/index.ts',
        'packages/public/vue-tinybase/src/**/lib.ts',
        'packages/public/vue-tinybase/src/test-utils/*.ts',
        'packages/public/vue-tinybase/src/common/array.ts',
        'packages/public/vue-tinybase/src/common/obj.ts',
      ],
    },
  },
})
