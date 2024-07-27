import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Checkpoints, Id, CheckpointIds } from 'tinybase/with-schemas'

export type UseCheckpointFunction = (
  checkpoints: Checkpoints<any>,
  checkpointId: MaybeRefOrGetter<Id>,
) => ComputedRef<string | undefined>

export type UseCheckpointIdsFunction = (checkpoints: Checkpoints<any>) => ComputedRef<CheckpointIds>
