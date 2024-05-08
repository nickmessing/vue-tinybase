import { computed, toValue } from '@vue/reactivity'

import { useValue } from '../../generated/composables/custom-store/useValue.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { DefaultedValueFromSchema, ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function valueRef<Store extends AnyStore, ValueId extends ValueIdFromSchema<ExtractSchemasFromStore<Store>[1]>>(
  store: Store,
  valueId: MaybeRefOrGetter<ValueId>,
): WritableComputedRef<DefaultedValueFromSchema<ExtractSchemasFromStore<Store>[1], ValueId>> {
  const { data } = useValue(store, valueId)
  return computed({
    get: () => data.value,
    set: value => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.setValue(toValue(valueId), value as any)
    },
  })
}
