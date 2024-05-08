import { onScopeDispose } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import type { AnyStore } from '../types.js'
import type { WatchSource } from '@vue/runtime-core'

type MultiWatchSources = (WatchSource<unknown> | object)[]

export type UseListenerOptions = {
  immediate?: boolean
}

const useListenerDefaultOptions = {
  immediate: true,
}

export function useListener<Store extends AnyStore>(
  store: Store,
  listenerCreator: (store: Store) => string,
  dependencies?: WatchSource | MultiWatchSources,
  options?: UseListenerOptions,
) {
  const { immediate } = {
    ...useListenerDefaultOptions,
    ...options,
  }

  let listener: string | undefined

  function startListening() {
    if (listener) {
      stopListening()
    }

    listener = listenerCreator(store)
  }

  function stopListening() {
    if (listener) {
      store.delListener(listener)
      listener = undefined
    }
  }

  if (immediate) {
    startListening()
  }
  onScopeDispose(stopListening)

  if (dependencies) {
    watch(dependencies, () => {
      if (listener) {
        stopListening()
        startListening()
      }
    })
  }

  return { stopListening, startListening }
}

export type UseListenerResult = ReturnType<typeof useListener>
