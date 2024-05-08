/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from '../../../composables/useStore.js'
import { onCellChange } from '../../events/custom-store/onCellChange.js'
import { useCell as useCellCustomStore } from '../custom-store/useCell.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellOrUndefined } from 'tinybase/with-schemas/store'

export type UseCellResult<
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>,
  CellId extends CellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0], TableId>,
> = {
  data: ComputedRef<CellOrUndefined<ExtractSchemasFromStore<DefaultStore>[0], TableId, CellId>>
}
export function useCell<
  TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>,
  CellId extends CellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0], TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
): UseCellResult<TableId, CellId> {
  const store = useStore()
  return useCellCustomStore(store, tableId, rowId, cellId)
}
