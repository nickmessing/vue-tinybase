/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { shallowRef, computed } from '@vue/reactivity'

import { onValuesChange } from '../../events/custom-store/onValuesChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Values } from 'tinybase/with-schemas/store'
export type UseValuesResult<Store extends AnyStore> = {
  data: ComputedRef<Values<ExtractSchemasFromStore<Store>[1]>>
}
export function useValues<Store extends AnyStore>(store: Store): UseValuesResult<Store> {
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getValues())
  }
  const { startListening: startListening } = onValuesChange(store, getDataFromStore, {
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
