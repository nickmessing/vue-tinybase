import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onCellIdsChange } from '../events/onCellIdsChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useCellIds<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>, rowId: MaybeRefOrGetter<Id>) {
  const tableIdRef = toRef(tableId as string)
  const rowIdRef = toRef(rowId)

  return useReactiveComposable<CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>[]>({
    getData: () =>
      store.getCellIds(tableIdRef.value, rowIdRef.value) as CellIdFromSchema<
        ExtractTablesSchemaFromStore<Store>,
        TableId
      >[],
    listener: ({ loadData }) =>
      onCellIdsChange(store, tableIdRef, rowIdRef, () => loadData(), false, { immediate: false }),
  })
}
