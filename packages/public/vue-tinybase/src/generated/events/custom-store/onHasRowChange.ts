/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasRowListener } from 'tinybase/with-schemas/store'
export function onHasRowChange<
  Store extends AnyStore,
  TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]> | null,
  RowIdOrNull extends IdOrNull,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: HasRowListener<ExtractSchemasFromStore<Store>, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  return useListener(
    store,
    store => store.addHasRowListener(tableIdRef.value, rowIdRef.value, listener as any),
    [tableIdRef, rowIdRef],
    options,
  )
}