import { injectStore } from '../../context/injectStore.js'
import { tablesRef as tablesRefCS } from '../../custom-store/store/references/tablesRef.js'

import type { DefaultStore, DefaultStoreTablesSchema } from '../../types.js'
import type { WritableComputedRef } from '@vue/reactivity'
import type { Tables } from 'tinybase/with-schemas/store'

export function tablesRef(): WritableComputedRef<Tables<DefaultStoreTablesSchema>> {
  return tablesRefCS<DefaultStore>(injectStore())
}
