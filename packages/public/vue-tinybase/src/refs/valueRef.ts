import { computed, toValue } from '@vue/reactivity'

import { useStore } from '../composables/useStore.js'
import { useValue } from '../generated/composables/default-store/useValue.js'

import type { ExtractSchemasFromStore, DefaultStore } from '../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { DefaultedValueFromSchema, ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function valueRef<ValueId extends ValueIdFromSchema<ExtractSchemasFromStore<DefaultStore>[1]>>(
  valueId: MaybeRefOrGetter<ValueId>,
): WritableComputedRef<DefaultedValueFromSchema<ExtractSchemasFromStore<DefaultStore>[1], ValueId>> {
  const store = useStore()
  const { data } = useValue(valueId)
  return computed({
    get: () => data.value,
    set: value => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.setValue(toValue(valueId), value as any)
    },
  })
}
