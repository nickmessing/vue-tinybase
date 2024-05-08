/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toRef } from '@vue/reactivity'

import { useStore } from '../../../composables/useStore.js'
import { useListener } from '../../../utils/useListener.js'

import type { ExtractSchemasFromStore, DefaultStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { RowCountListener } from 'tinybase/with-schemas/store'

export function onRowCountChange<
  TableIdOrNull extends TableIdFromSchema<ExtractSchemasFromStore<DefaultStore>[0]> | null,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowCountListener<ExtractSchemasFromStore<DefaultStore>, TableIdOrNull>,
  options?: UseListenerOptions,
) {
  const tableIdRef = toRef(tableId) as any
  return useListener(
    useStore(),
    store => store.addRowCountListener(tableIdRef.value, listener as any),
    [tableIdRef],
    options,
  )
}
