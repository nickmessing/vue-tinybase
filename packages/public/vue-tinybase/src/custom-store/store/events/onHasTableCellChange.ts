import { toValue } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { AnyStore, ExtractSchemasFromStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { AllCellIdFromSchema, CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { HasTableCellListener } from 'tinybase/with-schemas/store'

export function onHasTableCellChange<
  Store extends AnyStore,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>> | null,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>
        ? CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableIdOrNull>
        : AllCellIdFromSchema<ExtractTablesSchemaFromStore<Store>>)
    | null,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasTableCellListener<ExtractSchemasFromStore<Store>, TableIdOrNull, CellIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return useListener(
    store,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    store => store.addHasTableCellListener(toValue(tableId), toValue<any>(cellId), listener as any, toValue(mutator)),
    options,
  )
}
