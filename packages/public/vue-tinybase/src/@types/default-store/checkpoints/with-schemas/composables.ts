import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id, CheckpointIds } from 'tinybase/with-schemas'

export type UseCheckpointFunction = (checkpointId: MaybeRefOrGetter<Id>) => ComputedRef<string | undefined>

export type UseCheckpointIdsFunction = () => ComputedRef<CheckpointIds>
