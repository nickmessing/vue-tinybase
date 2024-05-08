/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { SortedRowIdsListener } from 'tinybase/with-schemas/store'
export function onSortedRowIdsChange<
  Store extends AnyStore,
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>,
  CellIdOrUndefined extends CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableId> | undefined,
  Descending extends boolean,
  Offset extends number,
  Limit extends number | undefined,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdOrUndefined>,
  descending: MaybeRefOrGetter<Descending>,
  offset: MaybeRefOrGetter<Offset>,
  limit: MaybeRefOrGetter<Limit>,
  listener: SortedRowIdsListener<ExtractSchemasFromStore<Store>, TableId, CellIdOrUndefined, Descending, Offset, Limit>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const cellIdRef = toRef(cellId) as any
  const descendingRef = toRef(descending) as any
  const offsetRef = toRef(offset) as any
  const limitRef = toRef(limit) as any
  return useListener(
    store,
    store =>
      store.addSortedRowIdsListener(
        tableIdRef.value,
        cellIdRef.value,
        descendingRef.value,
        offsetRef.value,
        limitRef.value,
        listener as any,
      ),
    [tableIdRef, cellIdRef, descendingRef, offsetRef, limitRef],
    options,
  )
}
