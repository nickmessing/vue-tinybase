import { injectStore } from '../../context/injectStore.js'
import { useTable as useTableCS } from '../../custom-store/store/composables/useTable.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Table } from 'tinybase/with-schemas/store'

export function useTable<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
): ComputedRef<Table<DefaultStoreTablesSchema, TableId>> {
  return useTableCS<DefaultStore, TableId>(injectStore(), tableId)
}
