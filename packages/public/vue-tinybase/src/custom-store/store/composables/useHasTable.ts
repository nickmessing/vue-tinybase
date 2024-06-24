import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onHasTableChange } from '../events/onHasTableChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasTable<Store extends AnyStore>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>>,
) {
  const tableIdRef = toRef(tableId)

  return useReactiveComposable<boolean>({
    getData: () => store.hasTable(tableIdRef.value),
    listener: ({ loadData }) =>
      onHasTableChange(
        store,
        tableIdRef,
        (_store, _tableId, hasTable) => {
          loadData(hasTable)
        },
        false,
        { immediate: false },
      ),
  })
}
