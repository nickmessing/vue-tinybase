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
import type { TableIdFromSchema, CellIdFromSchema, AllCellIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasCellListener } from 'tinybase/with-schemas/store'

export function onHasCellChange<
  TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>
        ? CellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0], TableIdOrNull>
        : AllCellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>)
    | null,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasCellListener<ExtractSchemasFromStore<DefaultStore>, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  const cellIdRef = toRef(cellId) as any
  return useListener(
    useStore(),
    store => store.addHasCellListener(tableIdRef.value, rowIdRef.value, cellIdRef.value, listener as any),
    [tableIdRef, rowIdRef, cellIdRef],
    options,
  )
}
