import { provide } from '@vue/runtime-core'

import { DefaultStoreKey } from './constants.js'

import type { AnyStore, UntypedStore } from './types.js'
import type { App, InjectionKey } from '@vue/runtime-core'

export function provideStore<S extends AnyStore = UntypedStore>(
  store: S,
  injectionKey?: symbol | string | InjectionKey<S>,
) {
  provide(injectionKey ?? DefaultStoreKey, store)
}

export function createTinybaseVue<S extends AnyStore = UntypedStore>(store: S) {
  return {
    install(app: App) {
      app.provide(DefaultStoreKey, store)
    },
    store,
  }
}
