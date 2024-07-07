import { ref, toValue } from '@vue/reactivity'
import { watchEffect, onScopeDispose } from '@vue/runtime-core'

import { ADD, LISTENER } from './strings.js'

import type { ListenerArgument, UseListenerOptions } from '../@types/_internal/common.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Store } from 'tinybase'

const useListenerDefaultOptions = {
  immediate: true,
}

export function useListener(
  store: Store,
  event: string,
  preArgs: Readonly<MaybeRefOrGetter<ListenerArgument>[]>,
  listener: (...args: any[]) => void,
  options?: UseListenerOptions,
  ...postArgs: MaybeRefOrGetter<ListenerArgument>[]
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
      const args = [...preArgs.map(arg => toValue(arg)), listener, ...postArgs.map(arg => toValue(arg))]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      listenerId.value = (store as any)[`${ADD}${event}${LISTENER}`](...args)
    }
  })

  onScopeDispose(listenerCleanup)

  return { stopListening, startListening, listenerId, isListening }
}
