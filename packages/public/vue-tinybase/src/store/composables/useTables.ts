import { injectStore } from '../../context/injectStore.js'
import { useTables as useTablesCS } from '../../custom-store/store/composables/useTables.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Tables } from 'tinybase/with-schemas/store'

export function useTables(): ComputedRef<Tables<DefaultStoreTablesSchema>> {
  return useTablesCS<DefaultStore>(injectStore())
}
