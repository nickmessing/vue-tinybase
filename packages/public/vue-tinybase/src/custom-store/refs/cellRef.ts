import { computed, toValue } from '@vue/reactivity'

import { useCell } from '../../generated/composables/custom-store/useCell.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellOrUndefined } from 'tinybase/with-schemas/store'

export function cellRef<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
  CellId extends CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableId>,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
): WritableComputedRef<CellOrUndefined<ExtractSchemasFromStore<Store>[0], TableId, CellId>> {
  const { data } = useCell(store, tableId, rowId, cellId)
  return computed({
    get: () => data.value,
    set: value => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.setCell(toValue(tableId), toValue(rowId), toValue(cellId), value as any)
    },
  })
}
