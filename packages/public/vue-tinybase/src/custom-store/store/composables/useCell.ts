import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onCellChange } from '../events/onCellChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellOrUndefined } from 'tinybase/with-schemas/store'

export function useCell<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>, rowId: MaybeRefOrGetter<Id>, cellId: MaybeRefOrGetter<CellId>) {
  const tableIdRef = toRef(tableId as string)
  const rowIdRef = toRef(rowId)
  const cellIdRef = toRef(cellId as string)

  return useReactiveComposable<CellOrUndefined<ExtractTablesSchemaFromStore<Store>, TableId, CellId>>({
    getData: () =>
      store.getCell(tableIdRef.value, rowIdRef.value, cellIdRef.value) as CellOrUndefined<
        ExtractTablesSchemaFromStore<Store>,
        TableId,
        CellId
      >,
    listener: ({ loadData }) =>
      onCellChange(store, tableIdRef, rowIdRef, cellIdRef as any, () => loadData(), false, { immediate: false }),
  })
}
