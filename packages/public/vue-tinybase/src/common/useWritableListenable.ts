/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { computed, toValue } from '@vue/reactivity'

import { EMPTY_ARRAY } from './constants.js'
import { _HAS, SET } from './strings.js'
import { useListenable } from './useListenable.js'

import type { ReturnType } from './useListenable.js'
import type { ListenerArgument } from '../@types/_internal/common.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'

export const useWritableListenable = (
  store: any,
  listenable: string,
  returnType: ReturnType,
  args: Readonly<MaybeRefOrGetter<ListenerArgument>[]> = EMPTY_ARRAY,
) => {
  const value = useListenable(store, listenable, returnType, args)

  return computed({
    get: () => value.value,
    set: newValue => {
      store[SET + listenable](...args.map(arg => toValue(arg)), newValue)
    },
  })
}
