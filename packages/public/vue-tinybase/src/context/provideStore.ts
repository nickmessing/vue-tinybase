import { DefaultStoreKey } from '../constants.js'
import { provideStore as provideStoreCS } from '../custom-store/context/provideStore.js'

import type { DefaultStore } from '../types.js'

/**
 * Provide the default store to the current context.
 * Should be used in the setup function of a component.
 */
export function provideStore(store: DefaultStore) {
  return provideStoreCS(DefaultStoreKey, store)
}
