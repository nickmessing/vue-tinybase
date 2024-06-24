import { injectStore } from '../../context/injectStore.js'
import { onHasCellChange as onHasCellChangeCS } from '../../custom-store/store/events/onHasCellChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { AllCellIdFromSchema, CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasCellListener } from 'tinybase/with-schemas/store'

export function onHasCellChange<
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
  listener: HasCellListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onHasCellChangeCS(injectStore(), tableId, rowId, cellId, listener, mutator, options)
}
