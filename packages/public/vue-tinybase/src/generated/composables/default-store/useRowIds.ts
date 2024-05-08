/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from '../../../composables/useStore.js'
import { onRowIdsChange } from '../../events/custom-store/onRowIdsChange.js'
import { useRowIds as useRowIdsCustomStore } from '../custom-store/useRowIds.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseRowIdsResult = {
  data: ComputedRef<Ids>
}
export function useRowIds(
  tableId: MaybeRefOrGetter<TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>>,
): UseRowIdsResult {
  const store = useStore()
  return useRowIdsCustomStore(store, tableId)
}
