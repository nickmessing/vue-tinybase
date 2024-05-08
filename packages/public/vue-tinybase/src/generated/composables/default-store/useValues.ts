/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { shallowRef, computed } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { onValuesChange } from '../../events/custom-store/onValuesChange.js'
import { useValues as useValuesCustomStore } from '../custom-store/useValues.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Values } from 'tinybase/with-schemas/store'

export type UseValuesResult = {
  data: ComputedRef<Values<ExtractSchemasFromStore<DefaultStore>[1]>>
}
export function useValues(): UseValuesResult {
  const store = useStore()
  return useValuesCustomStore(store)
}
