/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useStore } from '../../../composables/useStore.js'
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, DefaultStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { HasTablesListener } from 'tinybase/with-schemas/store'
export function onHasTablesChange(
  listener: HasTablesListener<ExtractSchemasFromStore<DefaultStore>>,
  options?: UseListenerOptions,
) {
  return useListener(useStore(), store => store.addHasTablesListener(listener as any), [], options)
}
