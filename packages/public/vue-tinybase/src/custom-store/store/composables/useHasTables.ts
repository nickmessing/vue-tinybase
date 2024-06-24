import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onHasTablesChange } from '../events/onHasTablesChange.js'

import type { AnyStore } from '../../../types.js'

export function useHasTables<Store extends AnyStore>(store: Store) {
  return useReactiveComposable<boolean>({
    getData: () => store.hasTables(),
    listener: ({ loadData }) =>
      onHasTablesChange(store, (_store, hasTables) => loadData(hasTables), false, { immediate: false }),
  })
}
