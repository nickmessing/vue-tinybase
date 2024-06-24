import { injectStore } from '../../context/injectStore.js'
import { onTableCellIdsChange as onTableCellIdsChangeCS } from '../../custom-store/store/events/onTableCellIdsChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { TableCellIdsListener } from 'tinybase/with-schemas/store'

export function onTableCellIdsChange<TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: TableCellIdsListener<DefaultStoreSchemas, TableIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onTableCellIdsChangeCS(injectStore(), tableId, listener, mutator, options)
}
