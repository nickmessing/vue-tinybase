import { injectStore } from '../../context/injectStore.js'
import { onStartTransaction as onStartTransactionCS } from '../../custom-store/store/events/onStartTransaction.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { TransactionListener } from 'tinybase/with-schemas/store'

export function onStartTransaction(listener: TransactionListener<DefaultStoreSchemas>, options?: UseListenerOptions) {
  return onStartTransactionCS(injectStore(), listener, options)
}
