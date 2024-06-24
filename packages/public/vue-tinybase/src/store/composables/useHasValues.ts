import { injectStore } from '../../context/injectStore.js'
import { useHasValues as useHasValuesCS } from '../../custom-store/store/composables/useHasValues.js'

import type { DefaultStore } from '../../types.js'
import type { ComputedRef } from '@vue/reactivity'

export function useHasValues(): ComputedRef<boolean> {
  return useHasValuesCS<DefaultStore>(injectStore())
}
