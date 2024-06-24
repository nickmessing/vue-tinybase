import { injectStore } from '../../context/injectStore.js'
import { onHasValuesChange as onHasValuesChangeCS } from '../../custom-store/store/events/onHasValuesChange.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { HasValuesListener } from 'tinybase/with-schemas/store'

export function onHasValuesChange(
  listener: HasValuesListener<DefaultStoreSchemas>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onHasValuesChangeCS(injectStore(), listener, mutator, options)
}
