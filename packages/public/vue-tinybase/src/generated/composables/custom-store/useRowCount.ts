/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'

import { onRowCountChange } from '../../events/custom-store/onRowCountChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
export type UseRowCountResult<Store extends AnyStore> = {
  data: ComputedRef<number>
}
export function useRowCount<Store extends AnyStore>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>>,
): UseRowCountResult<Store> {
  const tableIdRef = toRef(tableId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getRowCount(tableIdRef.value))
  }
  const { startListening: startListening } = onRowCountChange(store, tableIdRef, getDataFromStore, {
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
