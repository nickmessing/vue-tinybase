/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useStore } from '../../../composables/useStore.js'
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, DefaultStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { TableIdsListener } from 'tinybase/with-schemas/store'
export function onTableIdsChange(
  listener: TableIdsListener<ExtractSchemasFromStore<DefaultStore>>,
  options?: UseListenerOptions,
) {
  return useListener(useStore(), store => store.addTableIdsListener(listener as any), [], options)
}
