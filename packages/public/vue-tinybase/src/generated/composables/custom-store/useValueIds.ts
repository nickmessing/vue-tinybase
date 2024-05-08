/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { shallowRef, computed } from '@vue/reactivity'

import { onValueIdsChange } from '../../events/custom-store/onValueIdsChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
export type UseValueIdsResult<Store extends AnyStore> = {
  data: ComputedRef<ValueIdFromSchema<ExtractSchemasFromStore<Store>[1]>[]>
}
export function useValueIds<Store extends AnyStore>(store: Store): UseValueIdsResult<Store> {
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getValueIds())
  }
  const { startListening: startListening } = onValueIdsChange(store, getDataFromStore, {
    immediate: false,
  })
  const data = computed(() => {
    if (!isRefActive) {
      getDataFromStore()
      isRefActive = true
      startListening()
    }
    return localRef.value
  })
  return {
    data: data,
  }
}
