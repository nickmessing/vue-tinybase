import { toValue } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { AnyStore, ExtractSchemasFromStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { RowIdsListener } from 'tinybase/with-schemas/store'

export function onRowIdsChange<
  Store extends AnyStore,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>> | null,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowIdsListener<ExtractSchemasFromStore<Store>, TableIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return useListener(
    store,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    store => store.addRowIdsListener(toValue(tableId), listener as any, toValue(mutator)),
    options,
  )
}
