import { computed, toValue } from '@vue/reactivity'

import { useRow } from '../composables/useRow.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function rowRef<Store extends AnyStore, TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) {
  const rowReference = useRow(store, tableId, rowId)

  const row = computed({
    get: () => rowReference.value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    set: row => store.setRow(toValue(tableId), toValue(rowId), row as any),
  })

  return row
}
