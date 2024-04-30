import { computed, onScopeDispose, shallowRef, toRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from './useStore.js'

import type { AnyStore, ExtractValuesSchemaFromStore } from '../types.js'
import type { MaybeRefOrGetter, WritableComputedRef } from '@vue/reactivity'
import type { DefaultedValueFromSchema, ValueIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Value } from 'tinybase/with-schemas/store'

export type TypedUseValueFunction<Store extends AnyStore> = <
  ValueId extends ValueIdFromSchema<ExtractValuesSchemaFromStore<Store>>,
>(
  valueId: MaybeRefOrGetter<ValueId>,
) => WritableComputedRef<DefaultedValueFromSchema<ExtractValuesSchemaFromStore<Store>, ValueId>>

/**
 * Returns a **writable** computed reference to a value from a store.
 *
 * @param {MaybeRefOrGetter<ValueId>} valueId - **Reactive** value identifier.
 * @param {Store} [store] - The store to use. If not provided, the default store will be used.
 * @returns {WritableComputedRef<ValueType>} - The **writable** computed reference to the value.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useValue } from 'vue-tinybase'
 *
 * const isOpen = useValue('open') // assume it's a boolean
 * </script>
 * <template>
 *   <button v-on:click="isOpen = !isOpen">{{ isOpen ? 'Close' : 'Open' }}</button>
 * </template>
 * ```
 */
export function useValue<
  Store extends AnyStore,
  ValueId extends ValueIdFromSchema<ExtractValuesSchemaFromStore<Store>>,
>(
  valueId: MaybeRefOrGetter<ValueId>,
  store?: Store,
): WritableComputedRef<DefaultedValueFromSchema<ExtractValuesSchemaFromStore<Store>, ValueId>> {
  const storeToUse = store ?? useStore()
  const valueIdReference = toRef(valueId)

  const localCopy = shallowRef(
    storeToUse.getValue(valueIdReference.value) as DefaultedValueFromSchema<
      ExtractValuesSchemaFromStore<Store>,
      ValueId
    >,
  )

  let listener: string | undefined

  function listenerHandler(
    _store: unknown,
    _valueId: ValueId,
    newValue: DefaultedValueFromSchema<ExtractValuesSchemaFromStore<Store>, ValueId>,
  ) {
    localCopy.value = newValue
  }

  function startListening() {
    listener = storeToUse.addValueListener(
      valueIdReference.value,
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

  watch(valueIdReference, newValue => {
    stopListening()
    startListening()
    localCopy.value = storeToUse.getValue(newValue)
  })

  return computed<DefaultedValueFromSchema<ExtractValuesSchemaFromStore<Store>, ValueId>>({
    get: () => localCopy.value as DefaultedValueFromSchema<ExtractValuesSchemaFromStore<Store>, ValueId>,
    set: value => {
      storeToUse.setValue(valueIdReference.value, value as Value<ExtractValuesSchemaFromStore<Store>, ValueId>)
    },
  })
}
