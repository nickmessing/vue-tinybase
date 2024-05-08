/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { onTableCellIdsChange } from '../../events/custom-store/onTableCellIdsChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'
export type UseTableCellIdsResult<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
> = {
  data: ComputedRef<CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableId>[]>
}
export function useTableCellIds<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>): UseTableCellIdsResult<Store, TableId> {
  const tableIdRef = toRef(tableId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getTableCellIds(tableIdRef.value))
  }
  const { startListening: startListening } = onTableCellIdsChange(store, tableIdRef, getDataFromStore, {
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
  watch([tableIdRef], getDataFromStore)
  return {
    data: data,
  }
}
