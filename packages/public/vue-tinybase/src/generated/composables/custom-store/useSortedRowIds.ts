/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { onSortedRowIdsChange } from '../../events/custom-store/onSortedRowIdsChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'
export type UseSortedRowIdsResult<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
> = {
  data: ComputedRef<Ids>
}
export function useSortedRowIds<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  cellId?: MaybeRefOrGetter<CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableId>>,
  descending?: MaybeRefOrGetter<boolean>,
  offset?: MaybeRefOrGetter<number>,
  limit?: MaybeRefOrGetter<number>,
): UseSortedRowIdsResult<Store, TableId> {
  const tableIdRef = toRef(tableId) as any
  const cellIdRef = toRef(cellId) as any
  const descendingRef = toRef(descending) as any
  const offsetRef = toRef(offset) as any
  const limitRef = toRef(limit) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getSortedRowIds(
      tableIdRef.value,
      cellIdRef.value,
      descendingRef.value,
      offsetRef.value,
      limitRef.value,
    ))
  }
  const { startListening: startListening } = onSortedRowIdsChange(
    store,
    tableIdRef,
    cellIdRef,
    descendingRef,
    offsetRef,
    limitRef,
    getDataFromStore,
    {
      immediate: false,
    },
  )
  const data = computed(() => {
    if (!isRefActive) {
      getDataFromStore()
      isRefActive = true
      startListening()
    }
    return localRef.value
  })
  watch([tableIdRef, cellIdRef, descendingRef, offsetRef, limitRef], getDataFromStore)
  return {
    data: data,
  }
}
