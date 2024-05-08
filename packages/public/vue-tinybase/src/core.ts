import { provide } from '@vue/runtime-core'

import { DefaultStoreKey } from './constants.js'

import type { AnyStore, DefaultStore } from './types.js'
import type { App, InjectionKey } from '@vue/runtime-core'

export function provideStore<S extends AnyStore = DefaultStore>(
  store: S,
  injectionKey?: symbol | string | InjectionKey<DefaultStore>,
) {
  provide(injectionKey ?? DefaultStoreKey, store)
}

export function createTinybaseVue(store: DefaultStore) {
  return {
    install(app: App) {
      app.provide(DefaultStoreKey, store)
    },
    store,
  }
}
