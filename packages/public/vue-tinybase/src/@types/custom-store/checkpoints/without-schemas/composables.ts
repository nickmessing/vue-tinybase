import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { CheckpointIds, Checkpoints, Id } from 'tinybase'

export type UseCheckpointFunction = (
  checkpoints: Checkpoints,
  checkpointId: MaybeRefOrGetter<Id>,
) => ComputedRef<string | undefined>

export type UseCheckpointIdsFunction = (checkpoints: Checkpoints) => ComputedRef<CheckpointIds>
