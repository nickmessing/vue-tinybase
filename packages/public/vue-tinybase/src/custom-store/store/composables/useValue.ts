import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onValueChange } from '../events/onValueChange.js'

import type { AnyStore, ExtractValuesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Value } from 'tinybase/with-schemas/store'

export function useValue<
  Store extends AnyStore,
  ValueId extends ValueIdFromSchema<ExtractValuesSchemaFromStore<Store>>,
>(store: Store, valueId: MaybeRefOrGetter<ValueId>) {
  const valueIdRef = toRef(valueId as string)

  return useReactiveComposable<Value<ExtractValuesSchemaFromStore<Store>, ValueId>>({
    getData: () => store.getValue(valueIdRef.value) as Value<ExtractValuesSchemaFromStore<Store>, ValueId>,
    listener: ({ loadData }) => onValueChange(store, valueIdRef, () => loadData(), false, { immediate: false }),
  })
}
