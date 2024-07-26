import { ReturnType, useListenable } from '../../common/useListenable.js'

import type { UseCheckpointFunction } from '../../@types/custom-store/index.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Checkpoints, Id } from 'tinybase'

export const useCheckpoint = ((checkpoints: Checkpoints, checkpointId: MaybeRefOrGetter<Id>) =>
  useListenable(checkpoints, 'Checkpoint', ReturnType.CellOrValue, [checkpointId])) as UseCheckpointFunction
