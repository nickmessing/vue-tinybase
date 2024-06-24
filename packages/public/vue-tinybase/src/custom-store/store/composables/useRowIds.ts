import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onRowIdsChange } from '../events/onRowIdsChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Ids } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useRowIds<Store extends AnyStore>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>>,
) {
  const tableIdRef = toRef(tableId)

  return useReactiveComposable<Ids>({
    getData: () => store.getRowIds(tableIdRef.value),
    listener: ({ loadData }) => onRowIdsChange(store, tableIdRef, () => loadData(), false, { immediate: false }),
  })
}
