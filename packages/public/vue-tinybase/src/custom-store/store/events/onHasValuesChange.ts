import { toValue } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { HasValuesListener } from 'tinybase/with-schemas/store'

export function onHasValuesChange<Store extends AnyStore>(
  store: Store,
  listener: HasValuesListener<ExtractSchemasFromStore<Store>>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return useListener(store, store => store.addHasValuesListener(listener as any, toValue(mutator)), options)
}
