import { computed, onScopeDispose, shallowRef } from '@vue/reactivity'

import { useStore } from './useStore.js'

import type { AnyStore, ExtractValuesSchemaFromStore } from '../types.js'
import type { ComputedRef } from '@vue/reactivity'
import type { Values } from 'tinybase/with-schemas/store'

export type TypedUseValuesFunction<Store extends AnyStore> = () => ComputedRef<
  Values<ExtractValuesSchemaFromStore<Store>>
>

/**
 * Returns a **readonly** computed reference to all the values from a store.
 *
 * @param {Store} [store] - The store to use. If not provided, the default store will be used.
 * @returns {ComputedRef<Record<string, unknown>>} - The **readonly** computed reference to the value.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useValues } from 'vue-tinybase'
 *
 * const values = useValues()
 * </script>
 * <template>
 *   <h2>Store is {{ values.open ? 'open' : 'closed' }}</h2>
 * </template>
 * ```
 */
export function useValues<Store extends AnyStore>(
  store?: Store,
): ComputedRef<Values<ExtractValuesSchemaFromStore<Store>>> {
  const storeToUse = store ?? useStore()

  const localCopy = shallowRef<Record<string, unknown>>(storeToUse.getValues())

  let listener: string | undefined

  function listenerHandler(_store: unknown, valueId: string, newValue: unknown) {
    localCopy.value = {
      ...localCopy.value,
      [valueId]: newValue,
    }
  }
  function startListening() {
    listener = storeToUse.addValueListener(
      // eslint-disable-next-line unicorn/no-null
      null,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      listenerHandler as any,
    )
  }
  function stopListening() {
    if (listener) {
      storeToUse.delListener(listener)
      listener = undefined
    }
  }

  startListening()
  onScopeDispose(stopListening)

  return computed(() => localCopy.value as Values<ExtractValuesSchemaFromStore<Store>>)
}
