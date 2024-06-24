import { injectStore } from '../../context/injectStore.js'
import { onHasTablesChange as onHasTablesChangeCS } from '../../custom-store/store/events/onHasTablesChange.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { HasTablesListener } from 'tinybase/with-schemas/store'

export function onHasTablesChange(
  listener: HasTablesListener<DefaultStoreSchemas>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onHasTablesChangeCS(injectStore(), listener, mutator, options)
}
