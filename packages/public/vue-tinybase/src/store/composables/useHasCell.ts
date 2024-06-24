import { injectStore } from '../../context/injectStore.js'
import { useHasCell as useHasCellCS } from '../../custom-store/store/composables/useHasCell.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasCell<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellIdFromSchema<DefaultStoreTablesSchema, TableId>>,
): ComputedRef<boolean> {
  return useHasCellCS<DefaultStore, TableId>(injectStore(), tableId, rowId, cellId)
}
