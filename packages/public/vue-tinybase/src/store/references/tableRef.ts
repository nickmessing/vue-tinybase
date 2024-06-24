import { injectStore } from '../../context/injectStore.js'
import { tableRef as tableRefCS } from '../../custom-store/store/references/tableRef.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Table } from 'tinybase/with-schemas/store'

export function tableRef<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
): WritableComputedRef<Table<DefaultStoreTablesSchema, TableId>> {
  return tableRefCS<DefaultStore, TableId>(injectStore(), tableId)
}
