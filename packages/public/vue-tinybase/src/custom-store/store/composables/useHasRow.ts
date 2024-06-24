import { toRef } from '@vue/reactivity'

import { useReactiveComposable } from '../../../utils/useReactiveComposable.js'
import { onHasRowChange } from '../events/onHasRowChange.js'

import type { AnyStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'

export function useHasRow<Store extends AnyStore>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>>,
  rowId: MaybeRefOrGetter<Id>,
) {
  const tableIdRef = toRef(tableId)
  const rowIdRef = toRef(rowId)

  return useReactiveComposable<boolean>({
    getData: () => store.hasRow(tableIdRef.value, rowIdRef.value),
    listener: ({ loadData }) =>
      onHasRowChange(store, tableIdRef, rowIdRef, () => loadData(), false, { immediate: false }),
  })
}
