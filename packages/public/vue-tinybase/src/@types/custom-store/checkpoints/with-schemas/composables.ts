import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Checkpoints, Id } from 'tinybase/with-schemas'

export type UseCheckpointFunction = (
  checkpoints: Checkpoints<any>,
  checkpointId: MaybeRefOrGetter<Id>,
) => ComputedRef<string | undefined>
