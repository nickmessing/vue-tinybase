import { injectStore } from '../../context/injectStore.js'
import { useValueIds as useValueIdsCS } from '../../custom-store/store/composables/useValueIds.js'

import type { DefaultStore, DefaultStoreValuesSchema } from '../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useValueIds(): ComputedRef<ValueIdFromSchema<DefaultStoreValuesSchema>[]> {
  return useValueIdsCS<DefaultStore>(injectStore())
}
