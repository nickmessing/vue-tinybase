import { injectStore } from '../../context/injectStore.js'
import { useHasValue as useHasValueCS } from '../../custom-store/store/composables/useHasValue.js'

import type { DefaultStore, DefaultStoreValuesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasValue(
  valueId: MaybeRefOrGetter<ValueIdFromSchema<DefaultStoreValuesSchema>>,
): ComputedRef<boolean> {
  return useHasValueCS<DefaultStore>(injectStore(), valueId)
}
