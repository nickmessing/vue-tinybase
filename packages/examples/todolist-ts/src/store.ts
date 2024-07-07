import { createStore } from 'tinybase/with-schemas'

export const store = createStore()
  .setTablesSchema({
    todos: {
      text: { type: 'string' },
      completed: { type: 'boolean', default: false },
    },
  })
  .setValuesSchema({
    val1: { type: 'string' },
    val2: { type: 'number', default: 0 },
    val3: { type: 'boolean', default: false },
  })

export type Store = typeof store

declare module 'vue-tinybase' {
  export interface VueTinybaseContext {
    store: Store
  }
}
