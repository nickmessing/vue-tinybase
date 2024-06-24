import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onValueIdsChange } from '../events/onValueIdsChange.js'

import type { AnyStore, ExtractValuesSchemaFromStore } from '../../../types.js'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useValueIds<Store extends AnyStore>(store: Store) {
  return useReactiveComposable<ValueIdFromSchema<ExtractValuesSchemaFromStore<Store>>[]>({
    getData: () => store.getValueIds(),
    listener: ({ loadData }) => onValueIdsChange(store, () => loadData(), false, { immediate: false }),
  })
}
