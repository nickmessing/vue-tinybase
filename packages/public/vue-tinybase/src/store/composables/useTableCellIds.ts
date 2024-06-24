import { injectStore } from '../../context/injectStore.js'
import { useTableCellIds as useTableCellIdsCS } from '../../custom-store/store/composables/useTableCellIds.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useTableCellIds<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
): ComputedRef<CellIdFromSchema<DefaultStoreTablesSchema, TableId>[]> {
  return useTableCellIdsCS<DefaultStore, TableId>(injectStore(), tableId)
}
