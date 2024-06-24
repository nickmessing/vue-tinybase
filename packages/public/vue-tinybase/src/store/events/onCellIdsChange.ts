import { injectStore } from '../../context/injectStore.js'
import { onCellIdsChange as onCellIdsChangeCS } from '../../custom-store/store/events/onCellIdsChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellIdsListener } from 'tinybase/with-schemas/store'

export function onCellIdsChange<
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: CellIdsListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onCellIdsChangeCS(injectStore(), tableId, rowId, listener, mutator, options)
}
