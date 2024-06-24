import { provide } from '@vue/runtime-core'

import type { AnyStore } from '../types.js'
import type { InjectionKey } from '@vue/runtime-core'

/**
 * Provide a store to the current context.
 * Should be used in the setup function of a component.
 */
export function provideStore<T extends AnyStore>(storeKey: InjectionKey<T>, store: T) {
  return provide(storeKey, store)
}
