/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from '../../../composables/useStore.js'
import { onRowCountChange } from '../../events/custom-store/onRowCountChange.js'
import { useRowCount as useRowCountCustomStore } from '../custom-store/useRowCount.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseRowCountResult = {
  data: ComputedRef<number>
}
export function useRowCount(
  tableId: MaybeRefOrGetter<TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>>,
): UseRowCountResult {
  const store = useStore()
  return useRowCountCustomStore(store, tableId)
}
