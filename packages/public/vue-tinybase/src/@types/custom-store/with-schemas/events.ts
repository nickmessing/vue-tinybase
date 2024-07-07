import type {
  ExtractSchemasFromStore,
  ExtractTablesSchemaFromStore,
  ExtractValuesSchemaFromStore,
  UseListenerOptions,
  UseListenerResult,
} from '../../_internal/common.js'
import type {
  AllCellIdFromSchema,
  CellIdFromSchema,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../_internal/index.js'
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
  Store,
  TableCellIdsListener,
  TableIdsListener,
  TableListener,
  TablesListener,
  TransactionListener,
  ValueIdsListener,
  ValueListener,
  ValuesListener,
} from 'tinybase/with-schemas'

export type OnHasTablesChangeFunction = <S extends Store<any>>(
  store: S,
  listener: HasTablesListener<ExtractSchemasFromStore<S>>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTablesChangeFunction = <S extends Store<any>>(
  store: S,
  listener: TablesListener<ExtractSchemasFromStore<S>>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableIdsChangeFunction = <S extends Store<any>>(
  store: S,
  listener: TableIdsListener<ExtractSchemasFromStore<S>>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: HasTableListener<ExtractSchemasFromStore<S>, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: TableListener<ExtractSchemasFromStore<S>, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableCellIdsChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: TableCellIdsListener<ExtractSchemasFromStore<S>, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableCellChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>
        ? CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableIdOrNull>
        : AllCellIdFromSchema<ExtractTablesSchemaFromStore<S>>)
    | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasTableCellListener<ExtractSchemasFromStore<S>, TableIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowCountChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowCountListener<ExtractSchemasFromStore<S>, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowIdsChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  listener: RowIdsListener<ExtractSchemasFromStore<S>, TableIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnSortedRowIdsChangeFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
  CellIdOrUndefined extends CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId> | undefined,
  Descending extends boolean,
  Offset extends number,
  Limit extends number | undefined,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdOrUndefined>,
  descending: MaybeRefOrGetter<Descending>,
  offset: MaybeRefOrGetter<Offset>,
  limit: MaybeRefOrGetter<Limit>,
  listener: SortedRowIdsListener<ExtractSchemasFromStore<S>, TableId, CellIdOrUndefined, Descending, Offset, Limit>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasRowChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
  RowIdOrNull extends IdOrNull,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: HasRowListener<ExtractSchemasFromStore<S>, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
  RowIdOrNull extends IdOrNull,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: RowListener<ExtractSchemasFromStore<S>, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellIdsChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
  RowIdOrNull extends IdOrNull,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  listener: CellIdsListener<ExtractSchemasFromStore<S>, TableIdOrNull, RowIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasCellChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>
        ? CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableIdOrNull>
        : AllCellIdFromSchema<ExtractTablesSchemaFromStore<S>>)
    | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: HasCellListener<ExtractSchemasFromStore<S>, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellChangeFunction = <
  S extends Store<any>,
  TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>> | null,
  RowIdOrNull extends IdOrNull,
  CellIdOrNull extends
    | (TableIdOrNull extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>
        ? CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableIdOrNull>
        : AllCellIdFromSchema<ExtractTablesSchemaFromStore<S>>)
    | null,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableIdOrNull>,
  rowId: MaybeRefOrGetter<RowIdOrNull>,
  cellId: MaybeRefOrGetter<CellIdOrNull>,
  listener: CellListener<ExtractSchemasFromStore<S>, TableIdOrNull, RowIdOrNull, CellIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValuesChangeFunction = <S extends Store<any>>(
  store: S,
  listener: HasValuesListener<ExtractSchemasFromStore<S>>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValuesChangeFunction = <S extends Store<any>>(
  store: S,
  listener: ValuesListener<ExtractSchemasFromStore<S>>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueIdsChangeFunction = <S extends Store<any>>(
  store: S,
  listener: ValueIdsListener<ExtractSchemasFromStore<S>>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValueChangeFunction = <
  S extends Store<any>,
  ValueIdOrNull extends ValueIdFromSchema<ExtractValuesSchemaFromStore<S>> | null,
>(
  store: S,
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: HasValueListener<ExtractSchemasFromStore<S>, ValueIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueChangeFunction = <
  S extends Store<any>,
  ValueIdOrNull extends ValueIdFromSchema<ExtractValuesSchemaFromStore<S>> | null,
>(
  store: S,
  valueId: MaybeRefOrGetter<ValueIdOrNull>,
  listener: ValueListener<ExtractSchemasFromStore<S>, ValueIdOrNull>,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnStartTransactionFunction = <S extends Store<any>>(
  store: S,
  listener: TransactionListener<ExtractSchemasFromStore<S>>,
) => UseListenerResult

export type OnWillFinishTransactionFunction = <S extends Store<any>>(
  store: S,
  listener: TransactionListener<ExtractSchemasFromStore<S>>,
) => UseListenerResult

export type OnDidFinishTransactionFunction = <S extends Store<any>>(
  store: S,
  listener: TransactionListener<ExtractSchemasFromStore<S>>,
) => UseListenerResult
