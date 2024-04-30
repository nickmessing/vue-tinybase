import { computed, onScopeDispose, shallowRef, toRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from './useStore.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { GetIdChanges, Table } from 'tinybase/with-schemas/store'

export type TypedUseTableFunction<Store extends AnyStore> = <
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(
  tableId: MaybeRefOrGetter<TableId>,
) => ComputedRef<Table<ExtractTablesSchemaFromStore<Store>, TableId>>

type Cell = string | number | boolean
type Row = Record<string, Cell>
type TableRecord = Record<string, Row>

/**
 * Returns a **readonly** computed reference to a table from a store.
 *
 * @param {string} tableId - The ID of the table.
 * @param {Store} [store] - The store to use. If not provided, the default store will be used.
 * @returns {ComputedRef<Record<string, Row>>} - The **readonly** computed reference to the table.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTable } from 'vue-tinybase'
 *
 * const pets = useTable('pets')
 * </script>
 *
 * <template>
 *   <table>
 *     <thead>
 *       <tr>
 *         <th>Species</th>
 *         <th>Count</th>
 *         <th>Sold</th>
 *       </tr>
 *     </thead>
 *     <tbody>
 *       <tr v-for="(row, index) in pets" :key="index">
 *         <td>{{ row.species }}</td>
 *         <td>{{ row.count }}</td>
 *         <td>{{ row.sold }}</td>
 *       </tr>
 *     </tbody>
 *   </table>
 * </template>
 * ```
 */
export function useTable<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
>(tableId: MaybeRefOrGetter<TableId>, store?: Store): ComputedRef<Table<ExtractTablesSchemaFromStore<Store>, TableId>> {
  const storeToUse = store ?? useStore()
  const tableIdReference = toRef(tableId)

  const localCopy = shallowRef<TableRecord>(storeToUse.getTable(tableIdReference.value))

  let cellListener: string | undefined
  let rowIdsListener: string | undefined

  function cellListenerHandler(_store: unknown, _tableId: string, rowId: string, cellId: string, newCell: Cell) {
    console.log('listenerHandler', rowId, cellId, newCell)
    if (localCopy.value[rowId]) {
      localCopy.value = {
        ...localCopy.value,
        [rowId]: {
          ...localCopy.value[rowId],
          [cellId]: newCell,
        },
      }
    }
  }
  function rowIdsListenerHandler(_store: unknown, _tableId: string, getIdChanges: GetIdChanges<string> | undefined) {
    if (!getIdChanges) {
      return
    }

    const changes = getIdChanges()

    for (const rowId in changes) {
      if (changes[rowId] === -1) {
        const { [rowId]: _, ...newLocalCopy } = localCopy.value
        localCopy.value = newLocalCopy
      } else {
        localCopy.value = {
          ...localCopy.value,
          [rowId]: storeToUse.getRow(tableIdReference.value as string, rowId),
        }
      }
    }
  }
  function startListening() {
    rowIdsListener = storeToUse.addRowIdsListener(tableIdReference.value as string, rowIdsListenerHandler)
    // eslint-disable-next-line unicorn/no-null
    cellListener = storeToUse.addCellListener(tableIdReference.value as string, null, null, cellListenerHandler)
  }
  function stopListening() {
    if (cellListener) {
      storeToUse.delListener(cellListener)
      cellListener = undefined
    }
    if (rowIdsListener) {
      storeToUse.delListener(rowIdsListener)
      rowIdsListener = undefined
    }
  }

  startListening()
  onScopeDispose(stopListening)

  watch(tableIdReference, newValue => {
    stopListening()
    startListening()
    localCopy.value = storeToUse.getTable(newValue)
  })

  return computed(() => localCopy.value as Table<ExtractTablesSchemaFromStore<Store>, TableId>)
}
