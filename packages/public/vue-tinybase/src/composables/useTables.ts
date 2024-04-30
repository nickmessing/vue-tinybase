import { computed, onScopeDispose, shallowRef } from '@vue/reactivity'

import { useStore } from './useStore.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Tables } from 'tinybase/with-schemas/store'

export type TypedUseTablesFunction<Store extends AnyStore> = () => ComputedRef<
  Tables<ExtractTablesSchemaFromStore<Store>>
>

type Cell = string | number | boolean
type Row = Record<string, Cell>
type Table = Record<string, Row>
type TablesRecord = Record<string, Table>

/**
 * Returns a **readonly** computed reference to all the tables from a store.
 *
 * @param {Store} [store] - The store to use. If not provided, the default store will be used.
 * @returns {ComputedRef<Record<string, Table>>} - The **readonly** computed reference to the tables.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTables } from 'vue-tinybase'
 *
 * const tables = useTables()
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
 *       <tr v-for="(row, rowId) in tables.pets" :key="rowId">
 *         <td>{{ row.species }}</td>
 *         <td>{{ row.count }}</td>
 *         <td>{{ row.sold }}</td>
 *       </tr>
 *     </tbody>
 *   </table>
 * </template>
 * ```
 */
export function useTables<Store extends AnyStore>(
  store?: Store,
): ComputedRef<Tables<ExtractTablesSchemaFromStore<Store>>> {
  const storeToUse = store ?? useStore()

  const localCopy = shallowRef<TablesRecord>(storeToUse.getTables() as TablesRecord)

  let listener: string | undefined

  function listenerHandler(_store: unknown, tableId: string, rowId: string, cellId: string, newCell: Cell) {
    localCopy.value = {
      ...localCopy.value,
      [tableId]: {
        ...localCopy.value[tableId],
        [rowId]: {
          ...localCopy.value[tableId][rowId],
          [cellId]: newCell,
        },
      },
    }
  }
  function startListening() {
    // eslint-disable-next-line unicorn/no-null
    listener = storeToUse.addCellListener(null, null, null, listenerHandler)
  }
  function stopListening() {
    if (listener) {
      storeToUse.delListener(listener)
      listener = undefined
    }
  }

  startListening()
  onScopeDispose(stopListening)

  return computed(() => localCopy.value as Tables<ExtractTablesSchemaFromStore<Store>>)
}
