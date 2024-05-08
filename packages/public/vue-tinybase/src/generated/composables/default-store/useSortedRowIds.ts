/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { onSortedRowIdsChange } from '../../events/custom-store/onSortedRowIdsChange.js'
import { useSortedRowIds as useSortedRowIdsCustomStore } from '../custom-store/useSortedRowIds.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseSortedRowIdsResult<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>> = {
  data: ComputedRef<Ids>
}
export function useSortedRowIds<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>>(
  tableId: MaybeRefOrGetter<TableId>,
  cellId?: MaybeRefOrGetter<CellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0], TableId>>,
  descending?: MaybeRefOrGetter<boolean>,
  offset?: MaybeRefOrGetter<number>,
  limit?: MaybeRefOrGetter<number>,
): UseSortedRowIdsResult<TableId> {
  const store = useStore()
  return useSortedRowIdsCustomStore(store, tableId, cellId, descending, offset, limit)
}
