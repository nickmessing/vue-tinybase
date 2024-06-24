import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { TransactionListener } from 'tinybase/with-schemas/store'

export function onDidFinishTransaction<Store extends AnyStore>(
  store: Store,
  listener: TransactionListener<ExtractSchemasFromStore<Store>>,
  options?: UseListenerOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return useListener(store, store => store.addDidFinishTransactionListener(listener as any), options)
}
