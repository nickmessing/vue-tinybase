import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onRowChange } from '../events/onRowChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Row } from 'tinybase/with-schemas/store'

export function useRow<Store extends AnyStore, TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) {
  const tableIdRef = toRef(tableId as string)
  const rowIdRef = toRef(rowId)

  return useReactiveComposable<Row<ExtractTablesSchemaFromStore<Store>, TableId>>({
    getData: () => store.getRow(tableIdRef.value, rowIdRef.value) as Row<ExtractTablesSchemaFromStore<Store>, TableId>,
    listener: ({ loadData }) => onRowChange(store, tableIdRef, rowIdRef, () => loadData(), false, { immediate: false }),
  })
}
