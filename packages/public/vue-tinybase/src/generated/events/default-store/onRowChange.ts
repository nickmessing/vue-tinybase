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
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { RowListener } from 'tinybase/with-schemas/store'

export function onRowChange<
  TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]> | null,
  RowIdOrNull extends IdOrNull,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: RowListener<ExtractSchemasFromStore<DefaultStore>, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  return useListener(
    useStore(),
    store => store.addRowListener(tableIdRef.value, rowIdRef.value, listener as any),
    [tableIdRef, rowIdRef],
    options,
  )
}
