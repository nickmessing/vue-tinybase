import { inject } from '@vue/runtime-core'

import { DefaultStoreKey } from '../constants.js'

import type { AnyStore, UntypedStore } from '../types.js'
import type { InjectionKey } from '@vue/runtime-core'

export type TypedUseStoreFunction<Store extends AnyStore> = () => Store

export function useStore<S extends AnyStore = UntypedStore>(injectionKey?: symbol | string | InjectionKey<S>): S {
  const store = inject<S>(injectionKey ?? DefaultStoreKey)
  if (!store) {
    throw new Error('No store provided')
  }

  return store
}
