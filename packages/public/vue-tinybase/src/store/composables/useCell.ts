import { injectStore } from '../../context/injectStore.js'
import { useCell as useCellCS } from '../../custom-store/store/composables/useCell.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellOrUndefined } from 'tinybase/with-schemas/store'

export function useCell<
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellId extends CellIdFromSchema<DefaultStoreTablesSchema, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
): ComputedRef<CellOrUndefined<DefaultStoreTablesSchema, TableId, CellId>> {
  return useCellCS<DefaultStore, TableId, CellId>(injectStore(), tableId, rowId, cellId)
}
