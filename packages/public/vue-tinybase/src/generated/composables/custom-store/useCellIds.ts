/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'

import { onCellIdsChange } from '../../events/custom-store/onCellIdsChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'
export type UseCellIdsResult<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
> = {
  data: ComputedRef<CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableId>[]>
}
export function useCellIds<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>, rowId: MaybeRefOrGetter<Id>): UseCellIdsResult<Store, TableId> {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getCellIds(tableIdRef.value, rowIdRef.value))
  }
  const { startListening: startListening } = onCellIdsChange(store, tableIdRef, rowIdRef, getDataFromStore, {
    immediate: false,
  })
  const data = computed(() => {
    if (!isRefActive) {
      getDataFromStore()
      isRefActive = true
      startListening()
    }
    return localRef.value
  })
  return {
    data: data,
  }
}
