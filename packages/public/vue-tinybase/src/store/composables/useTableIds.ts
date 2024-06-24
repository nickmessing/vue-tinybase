import { injectStore } from '../../context/injectStore.js'
import { useTableIds as useTableIdsCS } from '../../custom-store/store/composables/useTableIds.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useTableIds(): ComputedRef<TableIdFromSchema<DefaultStoreTablesSchema>[]> {
  return useTableIdsCS<DefaultStore>(injectStore())
}
