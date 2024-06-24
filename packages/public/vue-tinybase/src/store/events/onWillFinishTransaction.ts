import { injectStore } from '../../context/injectStore.js'
import { onWillFinishTransaction as onWillFinishTransactionCS } from '../../custom-store/store/events/onWillFinishTransaction.js'

import type { DefaultStoreSchemas } from '../../types.js'
import type { UseListenerOptions } from '../../utils/useListener.js'
import type { TransactionListener } from 'tinybase/with-schemas/store'

export function onWillFinishTransaction(
  listener: TransactionListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
) {
  return onWillFinishTransactionCS(injectStore(), listener, options)
}
