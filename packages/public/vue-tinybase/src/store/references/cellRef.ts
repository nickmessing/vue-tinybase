import { injectStore } from '../../context/injectStore.js'
import { cellRef as cellRefCS } from '../../custom-store/store/references/cellRef.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellOrUndefined } from 'tinybase/with-schemas/store'

export function cellRef<
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellId extends CellIdFromSchema<DefaultStoreTablesSchema, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
): WritableComputedRef<CellOrUndefined<DefaultStoreTablesSchema, TableId, CellId>> {
  return cellRefCS<DefaultStore, TableId, CellId>(injectStore(), tableId, rowId, cellId)
}
