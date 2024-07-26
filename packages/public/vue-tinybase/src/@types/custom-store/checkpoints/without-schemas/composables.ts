import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Checkpoints, Id } from 'tinybase'

export type UseCheckpointFunction = (
  checkpoints: Checkpoints,
  checkpointId: MaybeRefOrGetter<Id>,
) => ComputedRef<string | undefined>
