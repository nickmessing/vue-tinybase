import { toValue } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdsListener } from 'tinybase/with-schemas/store'

export function onTableIdsChange<Store extends AnyStore>(
  store: Store,
  listener: TableIdsListener<ExtractSchemasFromStore<Store>>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return useListener(store, store => store.addTableIdsListener(listener as any, toValue(mutator)), options)
}
