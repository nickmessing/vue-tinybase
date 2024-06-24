import { injectStore } from '../../context/injectStore.js'
import { onTableIdsChange as onTableIdsChangeCS } from '../../custom-store/store/events/onTableIdsChange.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdsListener } from 'tinybase/with-schemas/store'

export function onTableIdsChange(
  listener: TableIdsListener<DefaultStoreSchemas>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return onTableIdsChangeCS(injectStore(), listener, mutator, options)
}
