import { injectStore } from '../../context/injectStore.js'
import { useCellIds as useCellIdsCS } from '../../custom-store/store/composables/useCellIds.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useCellIds<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
): ComputedRef<CellIdFromSchema<DefaultStoreTablesSchema, TableId>[]> {
  return useCellIdsCS<DefaultStore, TableId>(injectStore(), tableId, rowId)
}
