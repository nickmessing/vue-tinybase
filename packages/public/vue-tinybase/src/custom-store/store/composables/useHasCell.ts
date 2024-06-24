import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onHasCellChange } from '../events/onHasCellChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasCell<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>>,
) {
  const tableIdRef = toRef(tableId as string)
  const rowIdRef = toRef(rowId)
  const cellIdRef = toRef(cellId as string)

  return useReactiveComposable<boolean>({
    getData: () => store.hasCell(tableIdRef.value, rowIdRef.value, cellIdRef.value),
    listener: ({ loadData }) =>
      onHasCellChange(store, tableIdRef, rowIdRef, cellIdRef as any, () => loadData(), false, { immediate: false }),
  })
}
