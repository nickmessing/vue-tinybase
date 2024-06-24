import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onValuesChange } from '../events/onValuesChange.js'

import type { AnyStore, ExtractValuesSchemaFromStore } from '../../../types.js'
import type { Values } from 'tinybase/with-schemas/store'

export function useValues<Store extends AnyStore>(store: Store) {
  return useReactiveComposable<Values<ExtractValuesSchemaFromStore<Store>>>({
    getData: () => store.getValues() as Values<ExtractValuesSchemaFromStore<Store>>,
    listener: ({ loadData }) => onValuesChange(store, () => loadData(), false, { immediate: false }),
  })
}
