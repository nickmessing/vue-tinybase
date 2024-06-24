import { injectStore } from '../../context/injectStore.js'
import { onHasTableChange as onHasTableChangeCS } from '../../custom-store/store/events/onHasTableChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasTableListener } from 'tinybase/with-schemas/store'

export function onHasTableChange<TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: HasTableListener<DefaultStoreSchemas, TableIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onHasTableChangeCS(injectStore(), tableId, listener, mutator, options)
}
