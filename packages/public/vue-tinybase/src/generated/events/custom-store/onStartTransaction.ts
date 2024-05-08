/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { TransactionListener } from 'tinybase/with-schemas/store'
export function onStartTransaction<Store extends AnyStore>(
  store: Store,
  listener: TransactionListener<ExtractSchemasFromStore<Store>>,
  options?: UseListenerOptions,
) {
  return useListener(store, store => store.addStartTransactionListener(listener as any), [], options)
}
