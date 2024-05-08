/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { onTableChange } from '../../events/custom-store/onTableChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Table } from 'tinybase/with-schemas/store'
export type UseTableResult<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
> = {
  data: ComputedRef<Table<ExtractSchemasFromStore<Store>[0], TableId>>
}
export function useTable<Store extends AnyStore, TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
): UseTableResult<Store, TableId> {
  const tableIdRef = toRef(tableId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getTable(tableIdRef.value))
  }
  const { startListening: startListening } = onTableChange(store, tableIdRef, getDataFromStore, {
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
