import { computed, toValue } from '@vue/reactivity'

import { useStore } from '../composables/useStore.js'
import { useCell } from '../generated/composables/default-store/useCell.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellOrUndefined } from 'tinybase/with-schemas/store'

export function cellRef<
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>,
  CellId extends CellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0], TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
): WritableComputedRef<CellOrUndefined<ExtractSchemasFromStore<DefaultStore>[0], TableId, CellId>> {
  const store = useStore()
  const { data } = useCell(tableId, rowId, cellId)
  return computed({
    get: () => data.value,
    set: value => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.setCell(toValue(tableId), toValue(rowId), toValue(cellId), value as any)
    },
  })
}
