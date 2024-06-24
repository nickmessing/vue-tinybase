import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onTableCellIdsChange } from '../events/onTableCellIdsChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useTableCellIds<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>) {
  const tableIdRef = toRef(tableId as string)

  return useReactiveComposable<CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>[]>({
    getData: () => store.getTableCellIds(tableIdRef.value),
    listener: ({ loadData }) => onTableCellIdsChange(store, tableIdRef, () => loadData(), false, { immediate: false }),
  })
}
