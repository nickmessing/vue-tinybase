import { injectStore } from '../../context/injectStore.js'
import { useHasTable as useHasTableCS } from '../../custom-store/store/composables/useHasTable.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasTable(
  tableId: MaybeRefOrGetter<TableIdFromSchema<DefaultStoreTablesSchema>>,
): ComputedRef<boolean> {
  return useHasTableCS<DefaultStore>(injectStore(), tableId)
}
