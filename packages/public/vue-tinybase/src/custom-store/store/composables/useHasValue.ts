import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onHasValueChange } from '../events/onHasValueChange.js'

import type { AnyStore, ExtractValuesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasValue<Store extends AnyStore>(
  store: Store,
  valueId: MaybeRefOrGetter<ValueIdFromSchema<ExtractValuesSchemaFromStore<Store>>>,
) {
  const valueIdRef = toRef(valueId)

  return useReactiveComposable<boolean>({
    getData: () => store.hasValue(valueIdRef.value),
    listener: ({ loadData }) =>
      onHasValueChange(
        store,
        valueIdRef,
        (_store, _valueId, hasValue) => {
          loadData(hasValue)
        },
        false,
        { immediate: false },
      ),
  })
}
