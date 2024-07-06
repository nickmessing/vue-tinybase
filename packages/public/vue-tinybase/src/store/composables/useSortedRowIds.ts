import { injectStore } from '../../context/injectStore.js'
import { useSortedRowIds as useSortedRowIdsCS } from '../../custom-store/store/composables/useSortedRowIds.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useSortedRowIds<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  cellId?: MaybeRefOrGetter<CellIdFromSchema<DefaultStoreTablesSchema, TableId> | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
): ComputedRef<Ids> {
  return useSortedRowIdsCS<DefaultStore, TableId>(injectStore(), tableId, cellId, descending, offset, limit)
}
