/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from '../../../composables/useStore.js'
import { onCellIdsChange } from '../../events/custom-store/onCellIdsChange.js'
import { useCellIds as useCellIdsCustomStore } from '../custom-store/useCellIds.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseCellIdsResult<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>> = {
  data: ComputedRef<CellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0], TableId>[]>
}
export function useCellIds<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
): UseCellIdsResult<TableId> {
  const store = useStore()
  return useCellIdsCustomStore(store, tableId, rowId)
}
