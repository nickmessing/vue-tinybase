import { injectStore } from '../../context/injectStore.js'
import { useRowCount as useRowCountCS } from '../../custom-store/store/composables/useRowCount.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useRowCount<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
): ComputedRef<number> {
  return useRowCountCS<DefaultStore, TableId>(injectStore(), tableId)
}
