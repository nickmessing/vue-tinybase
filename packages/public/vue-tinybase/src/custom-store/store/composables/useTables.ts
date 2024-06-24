import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onTablesChange } from '../events/onTablesChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { Tables } from 'tinybase/with-schemas/store'

export function useTables<Store extends AnyStore>(store: Store) {
  return useReactiveComposable<Tables<ExtractTablesSchemaFromStore<Store>>>({
    getData: () => store.getTables(),
    listener: ({ loadData }) => onTablesChange(store, () => loadData(), false, { immediate: false }),
  })
}
