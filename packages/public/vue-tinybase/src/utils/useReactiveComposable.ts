import { computed, shallowRef } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'

import type { Ref } from '@vue/reactivity'

export type UseReactiveComposableOptions<T> = {
  getData: () => T
  listener: (options: { loadData: (value?: T) => void }) => {
    isListening: Ref<boolean>
    startListening: () => void
  }
}

export function useReactiveComposable<T>({ getData, listener }: UseReactiveComposableOptions<T>) {
  const dataReference = shallowRef<T>()

  function loadData(value?: T) {
    dataReference.value = value ?? getData()
  }

  const { isListening, startListening } = listener({ loadData })

  const data = computed(() => {
    if (!isListening.value) {
      loadData()
      startListening()
    }

    return dataReference.value as T
  })

  watchEffect(() => {
    if (isListening.value) {
      loadData()
    }
  })

  return data
}
