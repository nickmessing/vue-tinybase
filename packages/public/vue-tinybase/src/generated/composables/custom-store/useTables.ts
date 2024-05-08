/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { shallowRef, computed } from '@vue/reactivity'

import { onTablesChange } from '../../events/custom-store/onTablesChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Tables } from 'tinybase/with-schemas/store'
export type UseTablesResult<Store extends AnyStore> = {
  data: ComputedRef<Tables<ExtractSchemasFromStore<Store>[0]>>
}
export function useTables<Store extends AnyStore>(store: Store): UseTablesResult<Store> {
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getTables())
  }
  const { startListening: startListening } = onTablesChange(store, getDataFromStore, {
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
