import { toValue } from '@vue/reactivity'

import { useListener } from '../../../utils/useListener.js'

import type { AnyStore, ExtractSchemasFromStore, ExtractTablesSchemaFromStore } from '../../../types.js'
import type { UseListenerOptions } from '../../../utils/useListener.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { IdOrNull } from 'tinybase/with-schemas/common'
import type { AllCellIdFromSchema, CellIdFromSchema, TableIdFromSchema } from 'tinybase/with-schemas/internal/store'
import type { CellListener } from 'tinybase/with-schemas/store'

export function onCellChange<
  Store extends AnyStore,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<Store>>
        ? CellIdFromSchema<ExtractTablesSchemaFromStore<Store>, TableIdOrNull>
        : AllCellIdFromSchema<ExtractTablesSchemaFromStore<Store>>)
    | null,
>(
  store: Store,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: CellListener<ExtractSchemasFromStore<Store>, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  mutator?: MaybeRefOrGetter<boolean>,
  options?: UseListenerOptions,
) {
  return useListener(
    store,
    store =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.addCellListener(toValue(tableId), toValue(rowId), toValue<any>(cellId), listener as any, toValue(mutator)),
    options,
  )
}
