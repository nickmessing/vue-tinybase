import { toValue } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { AnyStore, ExtractSchemasFromStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { SortedRowIdsListener } from 'tinybase/with-schemas/store'

export function onSortedRowIdsChange<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>,
  CellIdOrUndefined extends CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableId> | undefined,
  Descending extends boolean | undefined,
  Offset extends number | undefined,
  Limit extends number | undefined,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdOrUndefined>,
  descending: MaybeRefOrGetter<Descending>,
  offset: MaybeRefOrGetter<Offset>,
  limit: MaybeRefOrGetter<Limit>,
  listener: SortedRowIdsListener<
    ExtractSchemasFromStore<Store>,
    TableId,
    CellIdOrUndefined,
    Descending extends undefined ? false : Descending,
    Offset extends undefined ? 0 : Offset,
    Limit
  >,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return useListener(
    store,
    store =>
      store.addSortedRowIdsListener(
        toValue(tableId),
        toValue(cellId),
        toValue(descending) ?? false,
        toValue(offset) ?? 0,
        toValue(limit),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        listener as any,
        toValue(mutator),
      ),
    options,
  )
}
