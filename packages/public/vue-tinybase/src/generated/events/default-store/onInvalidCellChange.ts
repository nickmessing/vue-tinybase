/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, DefaultStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { InvalidCellListener } from 'tinybase/with-schemas/store'

export function onInvalidCellChange(
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: InvalidCellListener<ExtractSchemasFromStore<DefaultStore>>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  const cellIdRef = toRef(cellId) as any
  return useListener(
    useStore(),
    store => store.addInvalidCellListener(tableIdRef.value, rowIdRef.value, cellIdRef.value, listener as any),
    [tableIdRef, rowIdRef, cellIdRef],
    options,
  )
}
