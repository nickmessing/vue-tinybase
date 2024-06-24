import { injectStore } from '../../context/injectStore.js'
import { onDidFinishTransaction as onDidFinishTransactionCS } from '../../custom-store/store/events/onDidFinishTransaction.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { TransactionListener } from 'tinybase/with-schemas/store'

export function onDidFinishTransaction(
  listener: TransactionListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
) {
  return onDidFinishTransactionCS(injectStore(), listener, options)
}
