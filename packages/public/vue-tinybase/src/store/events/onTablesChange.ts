import { injectStore } from '../../context/injectStore.js'
import { onTablesChange as onTablesChangeCS } from '../../custom-store/store/events/onTablesChange.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TablesListener } from 'tinybase/with-schemas/store'

export function onTablesChange(
  listener: TablesListener<DefaultStoreSchemas>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onTablesChangeCS(injectStore(), listener, mutator, options)
}
