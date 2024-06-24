import { injectStore } from '../../context/injectStore.js'
import { onTableChange as onTableChangeCS } from '../../custom-store/store/events/onTableChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { TableListener } from 'tinybase/with-schemas/store'

export function onTableChange<TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: TableListener<DefaultStoreSchemas, TableIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onTableChangeCS(injectStore(), tableId, listener, mutator, options)
}
