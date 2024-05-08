/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { TableIdsListener } from 'tinybase/with-schemas/store'
export function onTableIdsChange<Store extends AnyStore>(
  store: Store,
  listener: TableIdsListener<ExtractSchemasFromStore<Store>>,
  options?: UseListenerOptions,
) {
  return useListener(store, store => store.addTableIdsListener(listener as any), [], options)
}
