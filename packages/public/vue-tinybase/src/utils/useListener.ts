import { onScopeDispose, ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'

import type { AnyStore } from '../types.js'

export type UseListenerOptions = {
  immediate?: boolean
}

const useListenerDefaultOptions = {
  immediate: true,
}

export function useListener<Store extends AnyStore>(
  store: Store,
  listenerCreator: (store: Store) => string,
  options?: UseListenerOptions,
) {
  const { immediate } = {
    ...useListenerDefaultOptions,
    ...options,
  }

  const isListening = ref(immediate)
  const listenerId = ref<string>()

  function startListening() {
    if (isListening.value) {
      return
    }

    isListening.value = true
  }

  function stopListening() {
    if (!isListening.value) {
      return
    }

    isListening.value = false
  }

  function listenerCleanup() {
    if (listenerId.value) {
      store.delListener(listenerId.value)
      listenerId.value = undefined
    }
  }

  watchEffect(() => {
    listenerCleanup()

    if (isListening.value) {
      listenerId.value = listenerCreator(store)
    }
  })

  onScopeDispose(listenerCleanup)

  return { stopListening, startListening, listenerId, isListening }
}

export type UseListenerResult = ReturnType<typeof useListener>
