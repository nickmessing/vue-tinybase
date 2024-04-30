import { computed, onScopeDispose, shallowRef, toRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from './useStore.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type {
  CellIdFromSchema,
  CellIsDefaultedFromSchema,
  TableIdFromSchema,
} from 'tinybase/with-schemas/internal/store'
import type { Cell } from 'tinybase/with-schemas/store'

type CellValue = string | number | boolean

export type TypedUseCellFunction<Store extends AnyStore> = <
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<string>,
  cellId: MaybeRefOrGetter<CellId>,
  store?: Store,
) => WritableComputedRef<
  | Cell<ExtractTablesSchemaFromStore<Store>, TableId, CellId>
  | CellIsDefaultedFromSchema<ExtractTablesSchemaFromStore<Store>, TableId, CellId, undefined, never>
>

/**
 * Returns a **writable** computed reference to a cell from a store.
 */
export function useCell<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<string>,
  cellId: MaybeRefOrGetter<CellId>,
  store?: Store,
): WritableComputedRef<
  | Cell<ExtractTablesSchemaFromStore<Store>, TableId, CellId>
  | CellIsDefaultedFromSchema<ExtractTablesSchemaFromStore<Store>, TableId, CellId, undefined, never>
> {
  const storeToUse = store ?? useStore()
  const tableIdReference = toRef(tableId)
  const rowIdReference = toRef(rowId)
  const cellIdReference = toRef(cellId)

  const localCopy = shallowRef<CellValue | undefined>(
    storeToUse.getCell(tableIdReference.value, rowIdReference.value, cellIdReference.value),
  )

  let listener: string | undefined

  function listenerHandler(_store: unknown, _tableId: string, _rowId: string, _cellId: string, newCell: CellValue) {
    localCopy.value = newCell
  }
  function startListening() {
    // eslint-disable-next-line unicorn/no-null
    listener = storeToUse.addCellListener(
      tableIdReference.value as string,
      rowIdReference.value,
      cellIdReference.value as string,
      listenerHandler,
    )
  }
  function stopListening() {
    if (listener) {
      storeToUse.delListener(listener)
      listener = undefined
    }
  }

  startListening()
  onScopeDispose(stopListening)

  watch([tableIdReference, rowIdReference], () => {
    stopListening()
    startListening()
    localCopy.value = storeToUse.getCell(tableIdReference.value, rowIdReference.value, cellIdReference.value)
  })

  return computed<
    | Cell<ExtractTablesSchemaFromStore<Store>, TableId, CellId>
    | CellIsDefaultedFromSchema<ExtractTablesSchemaFromStore<Store>, TableId, CellId, undefined, never>
  >({
    get: () =>
      localCopy.value as
        | Cell<ExtractTablesSchemaFromStore<Store>, TableId, CellId>
        | CellIsDefaultedFromSchema<ExtractTablesSchemaFromStore<Store>, TableId, CellId, undefined, never>,
    set: value => {
      storeToUse.setCell(
        tableIdReference.value,
        rowIdReference.value,
        cellIdReference.value,
        value as Cell<ExtractTablesSchemaFromStore<Store>, TableId, CellId>,
      )
    },
  })
}
