/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema, CellIdFromSchema, AllCellIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellListener } from 'tinybase/with-schemas/store'
export function onCellChange<
  Store extends AnyStore,
  TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>
        ? CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableIdOrNull>
        : AllCellIdFromSchema<ExtractSchemasFromStore<Store>[0]>)
    | null,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: CellListener<ExtractSchemasFromStore<Store>, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const rowIdRef = toRef(rowId) as any
  const cellIdRef = toRef(cellId) as any
  return useListener(
    store,
    store => store.addCellListener(tableIdRef.value, rowIdRef.value, cellIdRef.value, listener as any),
    [tableIdRef, rowIdRef, cellIdRef],
    options,
  )
}
