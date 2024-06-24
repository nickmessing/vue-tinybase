import { injectStore } from '../../context/injectStore.js'
import { useRow as useRowCS } from '../../custom-store/store/composables/useRow.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Row } from 'tinybase/with-schemas/store'

export function useRow<TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
): ComputedRef<Row<DefaultStoreTablesSchema, TableId>> {
  return useRowCS<DefaultStore, TableId>(injectStore(), tableId, rowId)
}
