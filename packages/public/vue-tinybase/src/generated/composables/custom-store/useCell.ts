/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { onCellChange } from '../../events/custom-store/onCellChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellOrUndefined } from 'tinybase/with-schemas/store'
export type UseCellResult<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
  CellId extends CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableId>,
> = {
  data: ComputedRef<CellOrUndefined<ExtractSchemasFromStore<Store>[0], TableId, CellId>>
}
export function useCell<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
  CellId extends CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableId>,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
): UseCellResult<Store, TableId, CellId> {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  const cellIdRef = toRef(cellId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getCell(tableIdRef.value, rowIdRef.value, cellIdRef.value))
  }
  const { startListening: startListening } = onCellChange(store, tableIdRef, rowIdRef, cellIdRef, getDataFromStore, {
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
  watch([tableIdRef, rowIdRef, cellIdRef], getDataFromStore)
  return {
    data: data,
  }
}
