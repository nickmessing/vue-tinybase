/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { InvalidCellListener } from 'tinybase/with-schemas/store'
export function onInvalidCellChange<Store extends AnyStore>(
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: InvalidCellListener<ExtractSchemasFromStore<Store>>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  const cellIdRef = toRef(cellId) as any
  return useListener(
    store,
    store => store.addInvalidCellListener(tableIdRef.value, rowIdRef.value, cellIdRef.value, listener as any),
    [tableIdRef, rowIdRef, cellIdRef],
    options,
  )
}
