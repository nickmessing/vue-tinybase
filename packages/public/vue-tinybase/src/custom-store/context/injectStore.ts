import { inject } from '@vue/runtime-core'

import type { AnyStore } from '../types.js'
import type { InjectionKey } from '@vue/runtime-core'

export function injectStore<T extends AnyStore>(storeKey: InjectionKey<T>, shouldFailOnNotFound?: true): T
export function injectStore<T extends AnyStore>(storeKey: InjectionKey<T>, shouldFailOnNotFound: false): T | undefined
export function injectStore<T extends AnyStore>(storeKey: InjectionKey<T>, shouldFailOnNotFound = true): T | undefined {
  const store = inject(storeKey)

  if (shouldFailOnNotFound && !store) {
    throw new Error(`[tinybase-vue] (injectStore): Could not find store with key ${String(storeKey)}`)
  }

  return store
}
