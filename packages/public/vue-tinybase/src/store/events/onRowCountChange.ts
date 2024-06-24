import { injectStore } from '../../context/injectStore.js'
import { onRowCountChange as onRowCountChangeCS } from '../../custom-store/store/events/onRowCountChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { RowCountListener } from 'tinybase/with-schemas/store'

export function onRowCountChange<TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowCountListener<DefaultStoreSchemas, TableIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onRowCountChangeCS(injectStore(), tableId, listener, mutator, options)
}
