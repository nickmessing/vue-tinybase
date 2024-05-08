/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, DefaultStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { ValueListener } from 'tinybase/with-schemas/store'

export function onValueChange<ValueIdOrNull extends ValueIdFromSchema<ExtractSchemasFromStore<DefaultStore>[1]> | null>(
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: ValueListener<ExtractSchemasFromStore<DefaultStore>, ValueIdOrNull>,
  options?: UseListenerOptions,
) {
  const valueIdRef = toRef(valueId) as any
  return useListener(
    useStore(),
    store => store.addValueListener(valueIdRef.value, listener as any),
    [valueIdRef],
    options,
  )
}
