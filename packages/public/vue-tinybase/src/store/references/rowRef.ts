import { injectStore } from '../../context/injectStore.js'
import { rowRef as rowRefCS } from '../../custom-store/store/references/rowRef.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Row } from 'tinybase/with-schemas/store'

export function rowRef<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
): WritableComputedRef<Row<DefaultStoreTablesSchema, TableId>> {
  return rowRefCS<DefaultStore, TableId>(injectStore(), tableId, rowId)
}
