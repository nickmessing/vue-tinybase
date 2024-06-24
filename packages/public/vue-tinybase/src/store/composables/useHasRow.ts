import { injectStore } from '../../context/injectStore.js'
import { useHasRow as useHasRowCS } from '../../custom-store/store/composables/useHasRow.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasRow(
  tableId: MaybeRefOrGetter<TableIdFromSchema<DefaultStoreTablesSchema>>,
  rowId: MaybeRefOrGetter<Id>,
): ComputedRef<boolean> {
  return useHasRowCS<DefaultStore>(injectStore(), tableId, rowId)
}
