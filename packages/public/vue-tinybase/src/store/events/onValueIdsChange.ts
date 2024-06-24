import { injectStore } from '../../context/injectStore.js'
import { onValueIdsChange as onValueIdsChangeCS } from '../../custom-store/store/events/onValueIdsChange.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { ValueIdsListener } from 'tinybase/with-schemas/store'

export function onValueIdsChange(
  listener: ValueIdsListener<DefaultStoreSchemas>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onValueIdsChangeCS(injectStore(), listener, mutator, options)
}
