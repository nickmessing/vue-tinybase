import { computed, onScopeDispose, shallowRef, toRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from './useStore.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Row } from 'tinybase/with-schemas/store'

export type TypedUseRowFunction<Store extends AnyStore> = <
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<string>,
) => ComputedRef<Row<ExtractTablesSchemaFromStore<Store>, TableId>>

type Cell = string | number | boolean
type RowRecord = Record<string, Cell>

/**
 * Returns a **readonly** computed reference to a row from a table.
 *
 * @param {string} tableId - The ID of the table.
 * @param {string} rowId - The ID of the row.
 * @param {Store} [store] - The store to use. If not provided, the default store will be used.
 * @returns {ComputedRef<Record<string, Cell>>} - The **readonly** computed reference to the row.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useRow } from 'vue-tinybase'
 *
 * const props = defineProps(['rowId'])
 *
 * const pet = useRow('pets', () => props.rowId)
 * </script>
 *
 * <template>
 *   <tr>
 *     <td>{{ pet.species }}</td>
 *     <td>{{ pet.count }}</td>
 *     <td>{{ pet.sold }}</td>
 *   </tr>
 * </template>
 * ```
 */
export function useRow<Store extends AnyStore, TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<string>,
  store?: Store,
): ComputedRef<Row<ExtractTablesSchemaFromStore<Store>, TableId>> {
  const storeToUse = store ?? useStore()
  const tableIdReference = toRef(tableId)
  const rowIdReference = toRef(rowId)

  const localCopy = shallowRef<RowRecord>(storeToUse.getRow(tableIdReference.value, rowIdReference.value))

  let listener: string | undefined

  function listenerHandler(_store: unknown, _tableId: string, _rowId: string, cellId: string, newCell: Cell) {
    localCopy.value = {
      ...localCopy.value,
      [cellId]: newCell,
    }
  }
  function startListening() {
    // eslint-disable-next-line unicorn/no-null
    listener = storeToUse.addCellListener(tableIdReference.value as string, rowIdReference.value, null, listenerHandler)
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
    localCopy.value = storeToUse.getRow(tableIdReference.value, rowIdReference.value)
  })

  return computed(() => localCopy.value as Row<ExtractTablesSchemaFromStore<Store>, TableId>)
}
