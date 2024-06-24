import { injectStore } from '../../context/injectStore.js'
import { useValues as useValuesCS } from '../../custom-store/store/composables/useValues.js'

import type { DefaultStore, DefaultStoreValuesSchema } from '../../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Values } from 'tinybase/with-schemas/store'

export function useValues(): ComputedRef<Values<DefaultStoreValuesSchema>> {
  return useValuesCS<DefaultStore>(injectStore())
}
