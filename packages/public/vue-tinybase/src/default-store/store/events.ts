/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

import { injectStore } from './context.js'

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
} from '../../@types/default-store/events.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type {
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
  listener: HasTablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(injectStore() as any, HAS + TABLES, EMPTY_ARRAY, listener, options, mutator)) as OnHasTablesChangeFunction

export const onTablesChange = ((
  listener: TablesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, TABLES, EMPTY_ARRAY, listener, options, mutator)) as OnTablesChangeFunction

export const onTableIdsChange = ((
  listener: TableIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, TABLE_IDS, EMPTY_ARRAY, listener, options, mutator)) as OnTableIdsChangeFunction

export const onHasTableChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, HAS + TABLE, [tableId], listener, options, mutator)) as OnHasTableChangeFunction

export const onTableChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, TABLE, [tableId], listener, options, mutator)) as OnTableChangeFunction

export const onTableCellIdsChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: TableCellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(
    injectStore() as any,
    TABLE + CELL_IDS,
    [tableId],
    listener,
    options,
    mutator,
  )) as OnTableCellIdsChangeFunction

export const onHasTableCellChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasTableCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(
    injectStore() as any,
    HAS + TABLE + CELL,
    [tableId, cellId],
    listener,
    options,
    mutator,
  )) as OnHasTableCellChangeFunction

export const onRowCountChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowCountListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, ROW_COUNT, [tableId], listener, options, mutator)) as OnRowCountChangeFunction

export const onRowIdsChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  listener: RowIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, ROW_IDS, [tableId], listener, options, mutator)) as OnRowIdsChangeFunction

export const onSortedRowIdsChange = ((
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
    injectStore() as any,
    SORTED_ROW_IDS,
    [tableId, cellId, descending, offset, limit],
    listener,
    options,
    mutator,
  )) as OnSortedRowIdsChangeFunction

export const onHasRowChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: HasRowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(injectStore() as any, HAS + ROW, [tableId, rowId], listener, options, mutator)) as OnHasRowChangeFunction

export const onRowChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: RowListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, ROW, [tableId, rowId], listener, options, mutator)) as OnRowChangeFunction

export const onCellIdsChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  listener: CellIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(injectStore() as any, CELL_IDS, [tableId, rowId], listener, options, mutator)) as OnCellIdsChangeFunction

export const onHasCellChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: HasCellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(
    injectStore() as any,
    HAS + CELL,
    [tableId, rowId, cellId],
    listener,
    options,
    mutator,
  )) as OnHasCellChangeFunction

export const onCellChange = ((
  tableId: MaybeRefOrGetter<IdOrNull>,
  rowId: MaybeRefOrGetter<IdOrNull>,
  cellId: MaybeRefOrGetter<IdOrNull>,
  listener: CellListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(injectStore() as any, CELL, [tableId, rowId, cellId], listener, options, mutator)) as OnCellChangeFunction

export const onHasValuesChange = ((
  listener: HasValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) =>
  useListener(injectStore() as any, HAS + VALUES, EMPTY_ARRAY, listener, options, mutator)) as OnHasValuesChangeFunction

export const onValuesChange = ((
  listener: ValuesListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, VALUES, EMPTY_ARRAY, listener, options, mutator)) as OnValuesChangeFunction

export const onValueIdsChange = ((
  listener: ValueIdsListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, VALUE_IDS, EMPTY_ARRAY, listener, options, mutator)) as OnValueIdsChangeFunction

export const onHasValueChange = ((
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: HasValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, HAS + VALUE, [valueId], listener, options, mutator)) as OnHasValueChangeFunction

export const onValueChange = ((
  valueId: MaybeRefOrGetter<IdOrNull>,
  listener: ValueListener,
  options?: UseListenerOptions,
  mutator?: MaybeRefOrGetter<boolean | undefined>,
) => useListener(injectStore() as any, VALUE, [valueId], listener, options, mutator)) as OnValueChangeFunction

export const onStartTransaction = ((
  listener: TransactionListener,

  options?: UseListenerOptions,
) =>
  useListener(
    injectStore() as any,
    'Start' + TRANSACTION,
    EMPTY_ARRAY,
    listener,
    options,
  )) as OnStartTransactionFunction

export const onWillFinishTransaction = ((
  listener: TransactionListener,

  options?: UseListenerOptions,
) =>
  useListener(
    injectStore() as any,
    'WillFinish' + TRANSACTION,
    EMPTY_ARRAY,
    listener,
    options,
  )) as OnWillFinishTransactionFunction

export const onDidFinishTransaction = ((
  listener: TransactionListener,

  options?: UseListenerOptions,
) =>
  useListener(
    injectStore() as any,
    'DidFinish' + TRANSACTION,
    EMPTY_ARRAY,
    listener,
    options,
  )) as OnDidFinishTransactionFunction
