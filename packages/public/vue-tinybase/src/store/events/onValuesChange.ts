import { injectStore } from '../../context/injectStore.js'
import { onValuesChange as onValuesChangeCS } from '../../custom-store/store/events/onValuesChange.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValuesListener } from 'tinybase/with-schemas/store'

export function onValuesChange(
  listener: ValuesListener<DefaultStoreSchemas>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onValuesChangeCS(injectStore(), listener, mutator, options)
}
