import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onHasValuesChange } from '../events/onHasValuesChange.js'

import type { AnyStore } from '../../../types.js'

export function useHasValues<Store extends AnyStore>(store: Store) {
  return useReactiveComposable<boolean>({
    getData: () => store.hasValues(),
    listener: ({ loadData }) =>
      onHasValuesChange(store, (_store, hasValues) => loadData(hasValues), false, { immediate: false }),
  })
}
