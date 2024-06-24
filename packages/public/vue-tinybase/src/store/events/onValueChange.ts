import { injectStore } from '../../context/injectStore.js'
import { onValueChange as onValueChangeCS } from '../../custom-store/store/events/onValueChange.js'

import type { DefaultStoreSchemas, DefaultStoreValuesSchema } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { ValueListener } from 'tinybase/with-schemas/store'

export function onValueChange<ValueIdOrNull extends ValueIdFromSchema<DefaultStoreValuesSchema> | null>(
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: ValueListener<DefaultStoreSchemas, ValueIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onValueChangeCS(injectStore(), valueId, listener, mutator, options)
}
