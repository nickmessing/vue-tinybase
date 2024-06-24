import { injectStore } from '../../context/injectStore.js'
import { onCellChange as onCellChangeCS } from '../../custom-store/store/events/onCellChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { AllCellIdFromSchema, CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellListener } from 'tinybase/with-schemas/store'

export function onCellChange<
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema>
        ? CellIdFromSchema<DefaultStoreTablesSchema, TableIdOrNull>
        : AllCellIdFromSchema<DefaultStoreTablesSchema>)
    | null,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: CellListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onCellChangeCS(injectStore(), tableId, rowId, cellId, listener, mutator, options)
}
