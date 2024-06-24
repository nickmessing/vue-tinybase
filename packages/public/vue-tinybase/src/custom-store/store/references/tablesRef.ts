import { computed } from '@vue/reactivity'

import { useTables } from '../composables/useTables.js'

import type { AnyStore } from '../../../types.js'

export function tablesRef<Store extends AnyStore>(store: Store) {
  const tablesReference = useTables(store)

  const tables = computed({
    get: () => tablesReference.value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    set: tables => store.setTables(tables as any),
  })

  return tables
}
