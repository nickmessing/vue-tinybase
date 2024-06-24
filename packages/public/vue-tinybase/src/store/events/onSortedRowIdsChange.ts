import { injectStore } from '../../context/injectStore.js'
import { onSortedRowIdsChange as onSortedRowIdsChangeCS } from '../../custom-store/store/events/onSortedRowIdsChange.js'

import type { DefaultStoreSchemas, DefaultStoreTablesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { SortedRowIdsListener } from 'tinybase/with-schemas/store'

export function onSortedRowIdsChange<
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellIdOrUndefined extends CellIdFromSchema<DefaultStoreTablesSchema, TableId> | undefined,
  Descending extends boolean,
  Offset extends number,
  Limit extends number | undefined,
>(
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdOrUndefined>,
  descending: MaybeRefOrGetter<Descending>,
  offset: MaybeRefOrGetter<Offset>,
  limit: MaybeRefOrGetter<Limit>,
  listener: SortedRowIdsListener<DefaultStoreSchemas, TableId, CellIdOrUndefined, Descending, Offset, Limit>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onSortedRowIdsChangeCS(injectStore(), tableId, cellId, descending, offset, limit, listener, mutator, options)
}
