import { injectStore } from '../../context/injectStore.js'
import { valueRef as valueRefCS } from '../../custom-store/store/references/valueRef.js'

import type { DefaultStore, DefaultStoreValuesSchema } from '../../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Value } from 'tinybase/with-schemas/store'

export function valueRef<ValueId extends ValueIdFromSchema<DefaultStoreValuesSchema>>(
  valueId: MaybeRefOrGetter<ValueId>,
): WritableComputedRef<Value<DefaultStoreValuesSchema, ValueId>> {
  return valueRefCS<DefaultStore, ValueId>(injectStore(), valueId)
}
