import { injectStore } from '../../context/injectStore.js'
import { valuesRef as valuesRefCS } from '../../custom-store/store/references/valuesRef.js'

import type { DefaultStore, DefaultStoreValuesSchema } from '../../types.js'
import type { WritableComputedRef } from '@vue/reactivity'
import type { Values } from 'tinybase/with-schemas/store'

export function valuesRef(): WritableComputedRef<Values<DefaultStoreValuesSchema>> {
  return valuesRefCS<DefaultStore>(injectStore())
}
