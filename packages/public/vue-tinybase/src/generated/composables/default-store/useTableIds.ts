/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { shallowRef, computed } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { onTableIdsChange } from '../../events/custom-store/onTableIdsChange.js'
import { useTableIds as useTableIdsCustomStore } from '../custom-store/useTableIds.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseTableIdsResult = {
  data: ComputedRef<TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>[]>
}
export function useTableIds(): UseTableIdsResult {
  const store = useStore()
  return useTableIdsCustomStore(store)
}
