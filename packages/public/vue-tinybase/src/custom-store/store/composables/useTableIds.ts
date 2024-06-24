import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onTableIdsChange } from '../events/onTableIdsChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useTableIds<Store extends AnyStore>(store: Store) {
  return useReactiveComposable<TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>[]>({
    getData: () => store.getTableIds(),
    listener: ({ loadData }) => onTableIdsChange(store, () => loadData(), false, { immediate: false }),
  })
}
