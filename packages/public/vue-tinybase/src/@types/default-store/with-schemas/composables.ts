import type {
  CellIdFromSchema,
  DefaultedValueFromSchema,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../_internal/index.js'
import type { DefaultStoreTablesSchema, DefaultStoreValuesSchema } from '../context.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'
import type { CellOrUndefined, Ids, Row, Store, Table, Tables, Values } from 'tinybase/with-schemas'

export type UseCellFunction = <
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellId extends CellIdFromSchema<DefaultStoreTablesSchema, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
) => ComputedRef<CellOrUndefined<DefaultStoreTablesSchema, TableId, CellId>>

export type UseCellIdsFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<CellIdFromSchema<DefaultStoreTablesSchema, TableId>[]>

export type UseHasCellFunction = <
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellId extends CellIdFromSchema<DefaultStoreTablesSchema, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: CellId,
) => ComputedRef<boolean>

export type UseHasRowFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<boolean>

export type UseHasTableFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
) => ComputedRef<boolean>

export type UseHasTableCellFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdFromSchema<DefaultStoreTablesSchema, TableId>>,
) => ComputedRef<boolean>

export type UseHasTablesFunction = (store: Store<any>) => ComputedRef<boolean>

export type UseHasValueFunction = <ValueId extends ValueIdFromSchema<DefaultStoreValuesSchema>>(
  valueId: MaybeRefOrGetter<ValueId>,
) => ComputedRef<boolean>

export type UseHasValuesFunction = (store: Store<any>) => ComputedRef<boolean>

export type UseRowFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<Row<DefaultStoreTablesSchema, TableId>>

export type UseRowCountFunction = (tableId: TableIdFromSchema<DefaultStoreTablesSchema>) => ComputedRef<number>

export type UseRowIdsFunction = (tableId: TableIdFromSchema<DefaultStoreTablesSchema>) => ComputedRef<Ids>

export type UseSortedRowIdsFunction = <
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellId extends CellIdFromSchema<DefaultStoreTablesSchema, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  cellId?: MaybeRefOrGetter<CellId | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
) => ComputedRef<Ids>

export type UseTableFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
) => ComputedRef<Table<DefaultStoreTablesSchema, TableId>>

export type UseTableCellIdsFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
) => ComputedRef<CellIdFromSchema<DefaultStoreTablesSchema, TableId>[]>

export type UseTableIdsFunction = () => ComputedRef<TableIdFromSchema<DefaultStoreTablesSchema>[]>

export type UseTablesFunction = () => ComputedRef<Tables<DefaultStoreTablesSchema>>

export type UseValueFunction = <ValueId extends ValueIdFromSchema<DefaultStoreValuesSchema>>(
  valueId: MaybeRefOrGetter<ValueId>,
) => ComputedRef<DefaultedValueFromSchema<DefaultStoreValuesSchema, ValueId>>

export type UseValueIdsFunction = () => ComputedRef<ValueIdFromSchema<DefaultStoreValuesSchema>[]>

export type UseValuesFunction = () => ComputedRef<Values<DefaultStoreValuesSchema>>
