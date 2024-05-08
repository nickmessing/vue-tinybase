/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, AnyStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { TableListener } from 'tinybase/with-schemas/store'
export function onTableChange<
  Store extends AnyStore,
  TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<Store>[0]> | null,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: TableListener<ExtractSchemasFromStore<Store>, TableIdOrNull>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  return useListener(store, store => store.addTableListener(tableIdRef.value, listener as any), [tableIdRef], options)
}
