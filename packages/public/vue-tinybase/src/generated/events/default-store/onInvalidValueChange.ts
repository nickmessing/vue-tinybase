/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, DefaultStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { InvalidValueListener } from 'tinybase/with-schemas/store'

export function onInvalidValueChange(
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: InvalidValueListener<ExtractSchemasFromStore<DefaultStore>>,
  options?: UseListenerOptions,
) {
  const valueIdRef = toRef(valueId) as any
  return useListener(
    useStore(),
    store => store.addInvalidValueListener(valueIdRef.value, listener as any),
    [valueIdRef],
    options,
  )
}
