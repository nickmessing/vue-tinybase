import { injectStore } from '../../context/injectStore.js'
import { onHasTableCellChange as onHasTableCellChangeCS } from '../../custom-store/store/events/onHasTableCellChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { AllCellIdFromSchema, CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasTableCellListener } from 'tinybase/with-schemas/store'

export function onHasTableCellChange<
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema>
        ? CellIdFromSchema<DefaultStoreTablesSchema, TableIdOrNull>
        : AllCellIdFromSchema<DefaultStoreTablesSchema>)
    | null,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasTableCellListener<DefaultStoreSchemas, TableIdOrNull, CellIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onHasTableCellChangeCS(injectStore(), tableId, cellId, listener, mutator, options)
}
