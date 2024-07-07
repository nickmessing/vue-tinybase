import type { UseListenerOptions, UseListenerResult } from '../../_internal/common.js'
import type {
  AllCellIdFromSchema,
  CellIdFromSchema,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../_internal/index.js'
import type { DefaultStoreSchemas, DefaultStoreTablesSchema, DefaultStoreValuesSchema } from '../context.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type {
  CellIdsListener,
  CellListener,
  HasCellListener,
  HasRowListener,
  HasTableCellListener,
  HasTableListener,
  HasTablesListener,
  HasValueListener,
  HasValuesListener,
  IdOrNull,
  RowCountListener,
  RowIdsListener,
  RowListener,
  SortedRowIdsListener,
  TableCellIdsListener,
  TableIdsListener,
  TableListener,
  TablesListener,
  TransactionListener,
  ValueIdsListener,
  ValueListener,
  ValuesListener,
} from 'tinybase/with-schemas'

export type OnHasTablesChangeFunction = (
  listener: HasTablesListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTablesChangeFunction = (
  listener: TablesListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableIdsChangeFunction = (
  listener: TableIdsListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableChangeFunction = <TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: HasTableListener<DefaultStoreSchemas, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableChangeFunction = <TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: TableListener<DefaultStoreSchemas, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableCellIdsChangeFunction = <TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: TableCellIdsListener<DefaultStoreSchemas, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableCellChangeFunction = <
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema>
        ? CellIdFromSchema<DefaultStoreTablesSchema, TableIdOrNull>
        : AllCellIdFromSchema<DefaultStoreTablesSchema>)
    | null,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasTableCellListener<DefaultStoreSchemas, TableIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowCountChangeFunction = <TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowCountListener<DefaultStoreSchemas, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowIdsChangeFunction = <TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowIdsListener<DefaultStoreSchemas, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnSortedRowIdsChangeFunction = <
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellIdOrUndefined extends CellIdFromSchema<DefaultStoreTablesSchema, TableId> | undefined,
  Descending extends boolean,
  Offset extends number,
  Limit extends number | undefined,
>(
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdOrUndefined>,
  descending: MaybeRefOrGetter<Descending>,
  offset: MaybeRefOrGetter<Offset>,
  limit: MaybeRefOrGetter<Limit>,
  listener: SortedRowIdsListener<DefaultStoreSchemas, TableId, CellIdOrUndefined, Descending, Offset, Limit>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasRowChangeFunction = <
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: HasRowListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowChangeFunction = <
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: RowListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellIdsChangeFunction = <
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: CellIdsListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasCellChangeFunction = <
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema>
        ? CellIdFromSchema<DefaultStoreTablesSchema, TableIdOrNull>
        : AllCellIdFromSchema<DefaultStoreTablesSchema>)
    | null,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasCellListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellChangeFunction = <
  TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<DefaultStoreTablesSchema>
        ? CellIdFromSchema<DefaultStoreTablesSchema, TableIdOrNull>
        : AllCellIdFromSchema<DefaultStoreTablesSchema>)
    | null,
>(
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: CellListener<DefaultStoreSchemas, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValuesChangeFunction = (
  listener: HasValuesListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValuesChangeFunction = (
  listener: ValuesListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueIdsChangeFunction = (
  listener: ValueIdsListener<DefaultStoreSchemas>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValueChangeFunction = <ValueIdOrNull extends ValueIdFromSchema<DefaultStoreValuesSchema> | null>(
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: HasValueListener<DefaultStoreSchemas, ValueIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueChangeFunction = <ValueIdOrNull extends ValueIdFromSchema<DefaultStoreValuesSchema> | null>(
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: ValueListener<DefaultStoreSchemas, ValueIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnStartTransactionFunction = (listener: TransactionListener<DefaultStoreSchemas>) => UseListenerResult

export type OnWillFinishTransactionFunction = (listener: TransactionListener<DefaultStoreSchemas>) => UseListenerResult

export type OnDidFinishTransactionFunction = (listener: TransactionListener<DefaultStoreSchemas>) => UseListenerResult
