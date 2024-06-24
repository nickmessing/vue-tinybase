import { createStore } from 'tinybase/with-schemas'
import { createLocalPersister } from 'tinybase/with-schemas/persisters/persister-browser'

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

const persister = createLocalPersister(store, 'todos')

// eslint-disable-next-line unicorn/prefer-top-level-await
void (async () => {
  await persister.startAutoLoad()
  await persister.startAutoSave()
})()

export type Store = typeof store

declare module 'vue-tinybase' {
  export interface VueTinybaseContext {
    store: Store
  }
}
