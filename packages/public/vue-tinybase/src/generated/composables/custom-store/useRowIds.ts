/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { onRowIdsChange } from '../../events/custom-store/onRowIdsChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
export type UseRowIdsResult<Store extends AnyStore> = {
  data: ComputedRef<Ids>
}
export function useRowIds<Store extends AnyStore>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>>,
): UseRowIdsResult<Store> {
  const tableIdRef = toRef(tableId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getRowIds(tableIdRef.value))
  }
  const { startListening: startListening } = onRowIdsChange(store, tableIdRef, getDataFromStore, {
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
