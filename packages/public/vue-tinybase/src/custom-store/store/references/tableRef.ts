import { computed, toValue } from '@vue/reactivity'

import { useTable } from '../composables/useTable.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function tableRef<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>) {
  const tableReference = useTable(store, tableId)

  const table = computed({
    get: () => tableReference.value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    set: table => store.setTable(toValue(tableId), table as any),
  })

  return table
}
