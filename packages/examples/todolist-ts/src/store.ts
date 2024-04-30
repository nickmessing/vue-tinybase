import { createStore } from 'tinybase/with-schemas'
import { createLocalPersister } from 'tinybase/with-schemas/persisters/persister-browser'

export const store = createStore().setTablesSchema({
  todos: {
    text: { type: 'string' },
    completed: { type: 'boolean', default: false },
  },
})

const persister = createLocalPersister(store, 'todos')

await persister.startAutoLoad()
await persister.startAutoSave()

export type Store = typeof store
