import { EMPTY_ARRAY } from '../../common/constants.js'
import {
  CELL,
  CELL_IDS,
  HAS,
  ROW,
  ROW_COUNT,
  ROW_IDS,
  SORTED_ROW_IDS,
  TABLE,
  TABLES,
  TABLE_IDS,
  TRANSACTION,
  VALUE,
  VALUES,
  VALUE_IDS,
} from '../../common/strings.js'
import { useListener } from '../../common/useListener.js'

import type { UseListenerOptions } from '../../@types/_internal/common.js'
import type {
  OnHasTablesChangeFunction,
  OnTablesChangeFunction,
  OnTableIdsChangeFunction,
  OnHasTableChangeFunction,
  OnTableChangeFunction,
  OnTableCellIdsChangeFunction,
  OnHasTableCellChangeFunction,
  OnRowCountChangeFunction,
  OnRowIdsChangeFunction,
  OnSortedRowIdsChangeFunction,
  OnHasRowChangeFunction,
  OnRowChangeFunction,
  OnCellIdsChangeFunction,
  OnHasCellChangeFunction,
  OnCellChangeFunction,
  OnHasValuesChangeFunction,
  OnValuesChangeFunction,
  OnValueIdsChangeFunction,
  OnHasValueChangeFunction,
  OnValueChangeFunction,
  OnStartTransactionFunction,
  OnWillFinishTransactionFunction,
  OnDidFinishTransactionFunction,
} from '../../@types/custom-store/events.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type {
  Store,
  Id,
  IdOrNull,
  HasTablesListener,
  TablesListener,
  TableIdsListener,
  HasTableListener,
  TableListener,
  TableCellIdsListener,
  HasTableCellListener,
  RowCountListener,
  RowIdsListener,
  SortedRowIdsListener,
  HasRowListener,
  RowListener,
  CellIdsListener,
  HasCellListener,
  CellListener,
  HasValuesListener,
  ValuesListener,
  ValueIdsListener,
  HasValueListener,
  ValueListener,
  TransactionListener,
} from 'tinybase'

export const onHasTablesChange = ((
  store: Store,
  listener: HasTablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, HAS + TABLES, EMPTY_ARRAY, listener, options, mutator)) as OnHasTablesChangeFunction

export const onTablesChange = ((
  store: Store,
  listener: TablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, TABLES, EMPTY_ARRAY, listener, options, mutator)) as OnTablesChangeFunction

export const onTableIdsChange = ((
  store: Store,
  listener: TableIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, TABLE_IDS, EMPTY_ARRAY, listener, options, mutator)) as OnTableIdsChangeFunction

export const onHasTableChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, HAS + TABLE, [tableId], listener, options, mutator)) as OnHasTableChangeFunction

export const onTableChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, TABLE, [tableId], listener, options, mutator)) as OnTableChangeFunction

export const onTableCellIdsChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableCellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, TABLE + CELL_IDS, [tableId], listener, options, mutator)) as OnTableCellIdsChangeFunction

export const onHasTableCellChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(store, HAS + TABLE + CELL, [tableId, cellId], listener, options, mutator)) as OnHasTableCellChangeFunction

export const onRowCountChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowCountListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, ROW_COUNT, [tableId], listener, options, mutator)) as OnRowCountChangeFunction

export const onRowIdsChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, ROW_IDS, [tableId], listener, options, mutator)) as OnRowIdsChangeFunction

export const onSortedRowIdsChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id | undefined>,
  descending: MaybeRefOrGetter<boolean>,
  offset: MaybeRefOrGetter<number>,
  limit: MaybeRefOrGetter<number | undefined>,
  listener: SortedRowIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(
    store,
    SORTED_ROW_IDS,
    [tableId, cellId, descending, offset, limit],
    listener,
    options,
    mutator,
  )) as OnSortedRowIdsChangeFunction

export const onHasRowChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: HasRowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, HAS + ROW, [tableId, rowId], listener, options, mutator)) as OnHasRowChangeFunction

export const onRowChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: RowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, ROW, [tableId, rowId], listener, options, mutator)) as OnRowChangeFunction

export const onCellIdsChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: CellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, CELL_IDS, [tableId, rowId], listener, options, mutator)) as OnCellIdsChangeFunction

export const onHasCellChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, HAS + CELL, [tableId, rowId, cellId], listener, options, mutator)) as OnHasCellChangeFunction

export const onCellChange = ((
  store: Store,
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: CellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, CELL, [tableId, rowId, cellId], listener, options, mutator)) as OnCellChangeFunction

export const onHasValuesChange = ((
  store: Store,
  listener: HasValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, HAS + VALUES, EMPTY_ARRAY, listener, options, mutator)) as OnHasValuesChangeFunction

export const onValuesChange = ((
  store: Store,
  listener: ValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, VALUES, EMPTY_ARRAY, listener, options, mutator)) as OnValuesChangeFunction

export const onValueIdsChange = ((
  store: Store,
  listener: ValueIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, VALUE_IDS, EMPTY_ARRAY, listener, options, mutator)) as OnValueIdsChangeFunction

export const onHasValueChange = ((
  store: Store,
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: HasValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, HAS + VALUE, [valueId], listener, options, mutator)) as OnHasValueChangeFunction

export const onValueChange = ((
  store: Store,
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: ValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(store, VALUE, [valueId], listener, options, mutator)) as OnValueChangeFunction

export const onStartTransaction = ((
  store: Store,
  listener: TransactionListener,

  options?: UseListenerOptions,
) => useListener(store, 'Start' + TRANSACTION, EMPTY_ARRAY, listener, options)) as OnStartTransactionFunction

export const onWillFinishTransaction = ((
  store: Store,
  listener: TransactionListener,

  options?: UseListenerOptions,
) => useListener(store, 'WillFinish' + TRANSACTION, EMPTY_ARRAY, listener, options)) as OnWillFinishTransactionFunction

export const onDidFinishTransaction = ((
  store: Store,
  listener: TransactionListener,

  options?: UseListenerOptions,
) => useListener(store, 'DidFinish' + TRANSACTION, EMPTY_ARRAY, listener, options)) as OnDidFinishTransactionFunction
