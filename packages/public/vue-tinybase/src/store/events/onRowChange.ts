import { injectStore } from '../../context/injectStore.js'
import { onRowChange as onRowChangeCS } from '../../custom-store/store/events/onRowChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { RowListener } from 'tinybase/with-schemas/store'

export function onRowChange<
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: RowListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onRowChangeCS(injectStore(), tableId, rowId, listener, mutator, options)
}
