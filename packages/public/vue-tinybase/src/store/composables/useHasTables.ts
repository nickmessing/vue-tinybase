import { injectStore } from '../../context/injectStore.js'
import { useHasTables as useHasTablesCS } from '../../custom-store/store/composables/useHasTables.js'

import type { DefaultStore } from '../../types.js'
import type { ComputedRef } from '@vue/reactivity'

export function useHasTables(): ComputedRef<boolean> {
  return useHasTablesCS<DefaultStore>(injectStore())
}
