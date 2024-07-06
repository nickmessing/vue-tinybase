import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onSortedRowIdsChange } from '../events/onSortedRowIdsChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useSortedRowIds<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  cellId?: MaybeRefOrGetter<CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId> | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
) {
  const tableIdRef = toRef(tableId)
  const cellIdRef = toRef(cellId)
  const descendingRef = toRef(descending)
  const offsetRef = toRef(offset)
  const limitRef = toRef(limit)

  return useReactiveComposable<Ids>({
    getData: () => store.getSortedRowIds(tableIdRef.value),
    listener: ({ loadData }) =>
      onSortedRowIdsChange(
        store,
        tableIdRef as any,
        cellIdRef,
        descendingRef,
        offsetRef,
        limitRef,
        (_store, _tableId, _cellId, _descending, _offset, _limit, sortedRowIds) => loadData(sortedRowIds),
        false,
        {
          immediate: false,
        },
      ),
  })
}
