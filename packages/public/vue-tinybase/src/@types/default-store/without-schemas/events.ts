import type { UseListenerOptions, UseListenerResult } from '../../_internal/common.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type {
  IdOrNull,
  CellListener,
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
  listener: HasTablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTablesChangeFunction = (
  listener: TablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableIdsChangeFunction = (
  listener: TableIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnTableCellIdsChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableCellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasTableCellChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowCountChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowCountListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowIdsChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnSortedRowIdsChangeFunction = (
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
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: HasRowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnRowChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: RowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellIdsChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: CellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasCellChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnCellChangeFunction = (
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: CellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValuesChangeFunction = (
  listener: HasValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValuesChangeFunction = (
  listener: ValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueIdsChangeFunction = (
  listener: ValueIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnHasValueChangeFunction = (
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: HasValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnValueChangeFunction = (
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: ValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => UseListenerResult

export type OnStartTransactionFunction = (
  listener: TransactionListener,
  options?: UseListenerOptions,
) => UseListenerResult

export type OnWillFinishTransactionFunction = (
  listener: TransactionListener,
  options?: UseListenerOptions,
) => UseListenerResult

export type OnDidFinishTransactionFunction = (
  listener: TransactionListener,
  options?: UseListenerOptions,
) => UseListenerResult
