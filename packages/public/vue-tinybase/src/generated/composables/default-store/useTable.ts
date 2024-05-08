/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { onTableChange } from '../../events/custom-store/onTableChange.js'
import { useTable as useTableCustomStore } from '../custom-store/useTable.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Table } from 'tinybase/with-schemas/store'

export type UseTableResult<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>> = {
  data: ComputedRef<Table<ExtractSchemasFromStore<DefaultStore>[0], TableId>>
}
export function useTable<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>>(
  tableId: MaybeRefOrGetter<TableId>,
): UseTableResult<TableId> {
  const store = useStore()
  return useTableCustomStore(store, tableId)
}
