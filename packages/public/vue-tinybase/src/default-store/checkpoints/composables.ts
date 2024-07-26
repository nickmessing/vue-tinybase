import { ReturnType, useListenable } from '../../common/useListenable.js'

import { injectCheckpoints } from './context.js'

import type { UseCheckpointFunction } from '../../@types/default-store/index.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'

export const useCheckpoint = ((checkpointId: MaybeRefOrGetter<Id>) =>
  useListenable(injectCheckpoints(), 'Checkpoint', ReturnType.CellOrValue, [checkpointId])) as UseCheckpointFunction
