/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { onValueChange } from '../../events/custom-store/onValueChange.js'

import type { AnyStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema, DefaultedValueFromSchema } from 'tinybase/with-schemas/internal/store'
export type UseValueResult<
  Store extends AnyStore,
  ValueId extends ValueIdFromSchema<ExtractSchemasFromStore<Store>[1]>,
> = {
  data: ComputedRef<DefaultedValueFromSchema<ExtractSchemasFromStore<Store>[1], ValueId>>
}
export function useValue<Store extends AnyStore, ValueId extends ValueIdFromSchema<ExtractSchemasFromStore<Store>[1]>>(
  store: Store,
  valueId: MaybeRefOrGetter<ValueId>,
): UseValueResult<Store, ValueId> {
  const valueIdRef = toRef(valueId) as any
  let isRefActive = false
  const localRef = shallowRef()
  function getDataFromStore() {
    return (localRef.value = store.getValue(valueIdRef.value))
  }
  const { startListening: startListening } = onValueChange(store, valueIdRef, getDataFromStore, {
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
  watch([valueIdRef], getDataFromStore)
  return {
    data: data,
  }
}
