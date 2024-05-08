/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'

import { onRowChange } from '../../events/custom-store/onRowChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Row } from 'tinybase/with-schemas/store'
export type UseRowResult<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
> = {
  data: ComputedRef<Row<ExtractSchemasFromStore<Store>[0], TableId>>
}
export function useRow<Store extends AnyStore, TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
): UseRowResult<Store, TableId> {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getRow(tableIdRef.value, rowIdRef.value))
  }
  const { startListening: startListening } = onRowChange(store, tableIdRef, rowIdRef, getDataFromStore, {
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
