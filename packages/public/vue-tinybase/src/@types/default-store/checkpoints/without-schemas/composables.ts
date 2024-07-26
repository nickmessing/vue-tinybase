import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'

export type UseCheckpointFunction = (checkpointId: MaybeRefOrGetter<Id>) => ComputedRef<string | undefined>
