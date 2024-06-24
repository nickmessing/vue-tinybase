import { computed, toValue } from '@vue/reactivity'

import { useValue } from '../composables/useValue.js'

import type { AnyStore, ExtractValuesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function valueRef<
  Store extends AnyStore,
  ValueId extends ValueIdFromSchema<ExtractValuesSchemaFromStore<Store>>,
>(store: Store, valueId: MaybeRefOrGetter<ValueId>) {
  const valueReference = useValue(store, valueId)

  const value = computed({
    get: () => valueReference.value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    set: value => store.setValue(toValue(valueId), value as any),
  })

  return value
}
