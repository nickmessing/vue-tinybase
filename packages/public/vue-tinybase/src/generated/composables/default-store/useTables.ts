/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { shallowRef, computed } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { onTablesChange } from '../../events/custom-store/onTablesChange.js'
import { useTables as useTablesCustomStore } from '../custom-store/useTables.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Tables } from 'tinybase/with-schemas/store'

export type UseTablesResult = {
  data: ComputedRef<Tables<ExtractSchemasFromStore<DefaultStore>[0]>>
}
export function useTables(): UseTablesResult {
  const store = useStore()
  return useTablesCustomStore(store)
}
