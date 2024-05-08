/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { onValueChange } from '../../events/custom-store/onValueChange.js'
import { useValue as useValueCustomStore } from '../custom-store/useValue.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema, DefaultedValueFromSchema } from 'tinybase/with-schemas/internal/store'

export type UseValueResult<ValueId extends ValueIdFromSchema<ExtractSchemasFromStore<DefaultStore>[1]>> = {
  data: ComputedRef<DefaultedValueFromSchema<ExtractSchemasFromStore<DefaultStore>[1], ValueId>>
}
export function useValue<ValueId extends ValueIdFromSchema<ExtractSchemasFromStore<DefaultStore>[1]>>(
  valueId: MaybeRefOrGetter<ValueId>,
): UseValueResult<ValueId> {
  const store = useStore()
  return useValueCustomStore(store, valueId)
}
