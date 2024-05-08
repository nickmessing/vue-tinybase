/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from '../../../composables/useStore.js'
import { onTableCellIdsChange } from '../../events/custom-store/onTableCellIdsChange.js'
import { useTableCellIds as useTableCellIdsCustomStore } from '../custom-store/useTableCellIds.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema, CellIdFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseTableCellIdsResult<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>> = {
  data: ComputedRef<CellIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0], TableId>[]>
}
export function useTableCellIds<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>>(
  tableId: MaybeRefOrGetter<TableId>,
): UseTableCellIdsResult<TableId> {
  const store = useStore()
  return useTableCellIdsCustomStore(store, tableId)
}
