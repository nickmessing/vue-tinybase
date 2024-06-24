import { toValue } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { AnyStore, ExtractSchemasFromStore, ExtractValuesSchemaFromStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasValueListener } from 'tinybase/with-schemas/store'

export function onHasValueChange<
  Store extends AnyStore,
  ValueIdOrNull extends ValueIdFromSchema<ExtractValuesSchemaFromStore<Store>> | null,
>(
  store: Store,
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: HasValueListener<ExtractSchemasFromStore<Store>, ValueIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return useListener(
    store,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    store => store.addHasValueListener(toValue(valueId), listener as any, toValue(mutator)),
    options,
  )
}
