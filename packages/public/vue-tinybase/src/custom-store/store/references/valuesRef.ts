import { computed } from '@vue/reactivity'

import { useValues } from '../composables/useValues.js'

import type { AnyStore } from '../../../types.js'

export function valuesRef<Store extends AnyStore>(store: Store) {
  const valuesReference = useValues(store)

  const values = computed({
    get: () => valuesReference.value,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    set: values => store.setValues(values as any),
  })

  return values
}
