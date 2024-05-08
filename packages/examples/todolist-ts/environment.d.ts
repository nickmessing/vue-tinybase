/// <reference types="vite/client" />

declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  // eslint-disable-next-line import/no-default-export
  export default component
}
