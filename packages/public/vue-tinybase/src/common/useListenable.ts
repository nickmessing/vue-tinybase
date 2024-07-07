/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { computed, ref, toRef, toValue } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { arrayIsEqual } from './array.js'
import { EMPTY_ARRAY } from './constants.js'
import { objIsEqual } from './obj.js'
import { _HAS, EMPTY_STRING, GET, HAS } from './strings.js'
import { useListener } from './useListener.js'

import type { ListenerArgument } from '../@types/_internal/common.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { CheckpointIds } from 'tinybase'

export enum ReturnType {
  Object,
  Array,
  Checkpoints,
  CellOrValue,
  Boolean,
  Number,
}
export const DEFAULTS = [{}, [], [EMPTY_ARRAY, undefined, EMPTY_ARRAY], undefined, false, 0]
export const IS_EQUALS: ((thing1: any, thing2: any) => boolean)[] = [
  objIsEqual,
  arrayIsEqual,
  ([backwardIds1, currentId1, forwardIds1]: CheckpointIds, [backwardIds2, currentId2, forwardIds2]: CheckpointIds) =>
    currentId1 === currentId2 && arrayIsEqual(backwardIds1, backwardIds2) && arrayIsEqual(forwardIds1, forwardIds2),
]
export const isEqual = (thing1: any, thing2: any) => thing1 === thing2

export const useListenable = (
  store: any,
  listenable: string,
  returnType: ReturnType,
  args: Readonly<MaybeRefOrGetter<ListenerArgument>[]> = EMPTY_ARRAY,
) => {
  const lastResult = ref(DEFAULTS[returnType])
  const getResult = () => {
    const nextResult =
      store?.[(returnType == ReturnType.Boolean ? _HAS : GET) + listenable]?.(...args.map(arg => toValue(arg))) ??
      DEFAULTS[returnType]
    if (!(IS_EQUALS[returnType] ?? isEqual)(nextResult, lastResult.value)) {
      lastResult.value = nextResult
    }
    return lastResult.value
  }

  const { startListening, isListening } = useListener(
    store,
    (returnType == ReturnType.Boolean ? HAS : EMPTY_STRING) + listenable,
    args,
    getResult,
    { immediate: false },
  )

  watch(
    args.map(arg => toRef(arg)),
    () => {
      if (isListening.value) {
        getResult()
      }
    },
  )

  return computed(() => {
    if (isListening.value) {
      return lastResult.value
    }

    startListening()
    return getResult()
  })
}
