/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef, shallowRef, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import { useStore } from '../../../composables/useStore.js'
import { onRowChange } from '../../events/custom-store/onRowChange.js'
import { useRow as useRowCustomStore } from '../custom-store/useRow.js'

import type { DefaultStore, ExtractSchemasFromStore } from '../../../types.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase/with-schemas/common'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { Row } from 'tinybase/with-schemas/store'

export type UseRowResult<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>> = {
  data: ComputedRef<Row<ExtractSchemasFromStore<DefaultStore>[0], TableId>>
}
export function useRow<TableId extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
): UseRowResult<TableId> {
  const store = useStore()
  return useRowCustomStore(store, tableId, rowId)
}
