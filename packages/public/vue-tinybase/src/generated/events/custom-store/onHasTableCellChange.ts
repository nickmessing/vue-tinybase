/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema, CellIdFromSchema, AllCellIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasTableCellListener } from 'tinybase/with-schemas/store'
export function onHasTableCellChange<
  Store extends AnyStore,
  TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]> | null,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]>
        ? CellIdFromSchema<ExtractSchemasFromStore<Store>[0], TableIdOrNull>
        : AllCellIdFromSchema<ExtractSchemasFromStore<Store>[0]>)
    | null,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasTableCellListener<ExtractSchemasFromStore<Store>, TableIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  const cellIdRef = toRef(cellId) as any
  return useListener(
    store,
    store => store.addHasTableCellListener(tableIdRef.value, cellIdRef.value, listener as any),
    [tableIdRef, cellIdRef],
    options,
  )
}
