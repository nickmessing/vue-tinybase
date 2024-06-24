import { injectStore } from '../../context/injectStore.js'
import { onHasValueChange as onHasValueChangeCS } from '../../custom-store/store/events/onHasValueChange.js'

import type { DefaultStoreSchemas, DefaultStoreValuesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasValueListener } from 'tinybase/with-schemas/store'

export function onHasValueChange<ValueIdOrNull extends ValueIdFromSchema<DefaultStoreValuesSchema> | null>(
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: HasValueListener<DefaultStoreSchemas, ValueIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onHasValueChangeCS(injectStore(), valueId, listener, mutator, options)
}
