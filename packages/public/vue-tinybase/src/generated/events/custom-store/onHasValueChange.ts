/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasValueListener } from 'tinybase/with-schemas/store'
export function onHasValueChange<
  Store extends AnyStore,
  ValueIdOrNull extends ValueIdFromSchema<ExtractSchemasFromStore<Store>[1]> | null,
>(
  store: Store,
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: HasValueListener<ExtractSchemasFromStore<Store>, ValueIdOrNull>,
  options?: UseListenerOptions,
) {
  const valueIdRef = toRef(valueId) as any
  return useListener(
    store,
    store => store.addHasValueListener(valueIdRef.value, listener as any),
    [valueIdRef],
    options,
  )
}
