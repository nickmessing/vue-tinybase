import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onTableChange } from '../events/onTableChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Table } from 'tinybase/with-schemas/store'

export function useTable<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>) {
  const tableIdRef = toRef(tableId as string)

  return useReactiveComposable<Table<ExtractTablesSchemaFromStore<Store>, TableId>>({
    getData: () => store.getTable(tableIdRef.value) as Table<ExtractTablesSchemaFromStore<Store>, TableId>,
    listener: ({ loadData }) => onTableChange(store, tableIdRef, () => loadData(), false, { immediate: false }),
  })
}
