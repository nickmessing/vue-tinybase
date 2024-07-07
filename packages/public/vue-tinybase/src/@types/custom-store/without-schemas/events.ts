import type { UseListenerOptions, UseListenerResult } from '../../_internal/common.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type {
  IdOrNull,
  CellListener,
  Store,
  HasTablesListener,
  TablesListener,
  TableIdsListener,
  HasTableListener,
  TableListener,
  TableCellIdsListener,
  HasTableCellListener,
  RowCountListener,
  RowIdsListener,
  Id,
  SortedRowIdsListener,
  HasRowListener,
  RowListener,
  CellIdsListener,
  HasCellListener,
  HasValuesListener,
  ValuesListener,
  ValueIdsListener,
  HasValueListener,
  ValueListener,
  TransactionListener,
} from 'tinybase'

export type OnHasTablesChangeFunction = (
  store: Store,
  listener: HasTablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTablesChangeFunction = (
  store: Store,
  listener: TablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableIdsChangeFunction = (
  store: Store,
  listener: TableIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableCellIdsChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableCellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableCellChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowCountChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowCountListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowIdsChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnSortedRowIdsChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id | undefined>,
  descending: MaybeRefOrGetter<boolean>,
  offset: MaybeRefOrGetter<number>,
  limit: MaybeRefOrGetter<number | undefined>,
  listener: SortedRowIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasRowChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: HasRowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: RowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellIdsChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: CellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasCellChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellChangeFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: CellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValuesChangeFunction = (
  store: Store,
  listener: HasValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValuesChangeFunction = (
  store: Store,
  listener: ValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueIdsChangeFunction = (
  store: Store,
  listener: ValueIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValueChangeFunction = (
  store: Store,
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: HasValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueChangeFunction = (
  store: Store,
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: ValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnStartTransactionFunction = (
  store: Store,
  listener: TransactionListener,
  options?: UseListenerOptions,
) => UseListenerResult

export type OnWillFinishTransactionFunction = (
  store: Store,
  listener: TransactionListener,
  options?: UseListenerOptions,
) => UseListenerResult

export type OnDidFinishTransactionFunction = (
  store: Store,
  listener: TransactionListener,
  options?: UseListenerOptions,
) => UseListenerResult
