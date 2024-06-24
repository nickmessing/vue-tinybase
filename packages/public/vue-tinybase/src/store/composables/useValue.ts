import { injectStore } from '../../context/injectStore.js'
import { useValue as useValueCS } from '../../custom-store/store/composables/useValue.js'

import type { DefaultStore, DefaultStoreValuesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Value } from 'tinybase/with-schemas/store'

export function useValue<ValueId extends ValueIdFromSchema<DefaultStoreValuesSchema>>(
  valueId: MaybeRefOrGetter<ValueId>,
): ComputedRef<Value<DefaultStoreValuesSchema, ValueId>> {
  return useValueCS<DefaultStore, ValueId>(injectStore(), valueId)
}
