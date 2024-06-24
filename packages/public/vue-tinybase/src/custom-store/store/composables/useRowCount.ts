import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onRowCountChange } from '../events/onRowCountChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useRowCount<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>) {
  const tableIdRef = toRef(tableId as string)

  return useReactiveComposable<number>({
    getData: () => store.getRowCount(tableIdRef.value),
    listener: ({ loadData }) => onRowCountChange(store, tableIdRef, () => loadData(), false, { immediate: false }),
  })
}
