/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { shallowRef, computed } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { onValueIdsChange } from '../../events/custom-store/onValueIdsChange.js'
import { useValueIds as useValueIdsCustomStore } from '../custom-store/useValueIds.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseValueIdsResult = {
  data: ComputedRef<ValueIdFromSchema<ExtractSchemasFromStore<DefaultStore>[1]>[]>
}
export function useValueIds(): UseValueIdsResult {
  const store = useStore()
  return useValueIdsCustomStore(store)
}
