import { injectStore } from '../../context/injectStore.js'
import { onRowIdsChange as onRowIdsChangeCS } from '../../custom-store/store/events/onRowIdsChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { RowIdsListener } from 'tinybase/with-schemas/store'

export function onRowIdsChange<TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowIdsListener<DefaultStoreSchemas, TableIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onRowIdsChangeCS(injectStore(), tableId, listener, mutator, options)
}
