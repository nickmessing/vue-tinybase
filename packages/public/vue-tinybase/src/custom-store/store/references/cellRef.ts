import { computed, toValue } from '@vue/reactivity'

import { useCell } from '../composables/useCell.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function cellRef<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId>,
>(store: Store, tableId: MaybeRefOrGetter<TableId>, rowId: MaybeRefOrGetter<Id>, cellId: MaybeRefOrGetter<CellId>) {
  const cellReference = useCell(store, tableId, rowId, cellId)

  const cell = computed({
    get: () => cellReference.value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    set: cell => store.setCell(toValue(tableId), toValue(rowId), toValue(cellId), cell as any),
  })

  return cell
}
