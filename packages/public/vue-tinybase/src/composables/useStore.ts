import { inject } from '@vue/runtime-core'

import { DefaultStoreKey } from '../constants.js'

export function useStore() {
  const store = inject(DefaultStoreKey)
  if (!store) {
    throw new Error('No store provided')
  }

  return store
}
