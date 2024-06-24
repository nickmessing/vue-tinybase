import { injectStore } from '../../context/injectStore.js'
import { onHasRowChange as onHasRowChangeCS } from '../../custom-store/store/events/onHasRowChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasRowListener } from 'tinybase/with-schemas/store'

export function onHasRowChange<
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: HasRowListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onHasRowChangeCS(injectStore(), tableId, rowId, listener, mutator, options)
}
