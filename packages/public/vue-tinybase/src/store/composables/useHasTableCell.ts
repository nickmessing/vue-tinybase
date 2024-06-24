import { injectStore } from '../../context/injectStore.js'
import { useHasTableCell as useHasTableCellCS } from '../../custom-store/store/composables/useHasTableCell.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasTableCell<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdFromSchema<DefaultStoreTablesSchema, TableId>>,
): ComputedRef<boolean> {
  return useHasTableCellCS<DefaultStore, TableId>(injectStore(), tableId, cellId)
}
