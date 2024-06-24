import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onHasTableCellChange } from '../events/onHasTableCellChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter, Ref } from '@vue/reactivity'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasTableCell<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>>,
) {
  const tableIdRef = toRef(tableId) as Ref<TableId>
  const cellIdRef = toRef(cellId) as Ref<CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>>

  return useReactiveComposable<boolean>({
    getData: () => store.hasTableCell(tableIdRef.value, cellIdRef.value),
    listener: ({ loadData }) =>
      onHasTableCellChange(
        store,
        tableIdRef,
        cellIdRef as any,
        (_store: unknown, _tableId: unknown, _cellId: unknown, hasTableCell: unknown) => {
          loadData(hasTableCell as boolean)
        },
        false,
        { immediate: false },
      ),
  })
}
