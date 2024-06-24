import { injectStore } from '../../context/injectStore.js'
import { useRowIds as useRowIdsCS } from '../../custom-store/store/composables/useRowIds.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useRowIds(tableId: MaybeRefOrGetter<TableIdFromSchema<DefaultStoreTablesSchema>>): ComputedRef<Ids> {
  return useRowIdsCS<DefaultStore>(injectStore(), tableId)
}
