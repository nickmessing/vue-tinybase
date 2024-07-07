import { toValue } from '@vue/reactivity'

import {
  CELL,
  CELL_IDS,
  ROW,
  ROW_COUNT,
  ROW_IDS,
  SORTED_ROW_IDS,
  TABLE,
  TABLES,
  TABLE_IDS,
  VALUE,
  VALUES,
  VALUE_IDS,
} from '../../common/strings.js'
import { ReturnType, useListenable } from '../../common/useListenable.js'

import { injectStore } from './context.js'

import type {
  UseCellFunction,
  UseCellIdsFunction,
  UseHasCellFunction,
  UseHasRowFunction,
  UseHasTableCellFunction,
  UseHasTableFunction,
  UseHasTablesFunction,
  UseHasValueFunction,
  UseHasValuesFunction,
  UseRowCountFunction,
  UseRowFunction,
  UseRowIdsFunction,
  UseSortedRowIdsFunction,
  UseTableCellIdsFunction,
  UseTableFunction,
  UseTableIdsFunction,
  UseTablesFunction,
  UseValueFunction,
  UseValueIdsFunction,
  UseValuesFunction,
} from '../../@types/default-store/composables.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'

export const useCell = ((tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>, cellId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, CELL, ReturnType.CellOrValue, [tableId, rowId, cellId])) as UseCellFunction

export const useCellIds = ((tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, CELL_IDS, ReturnType.Array, [tableId, rowId])) as UseCellIdsFunction

export const useHasCell = ((tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>, cellId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, CELL, ReturnType.Boolean, [tableId, rowId, cellId])) as UseHasCellFunction

export const useHasRow = ((tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, ROW, ReturnType.Boolean, [tableId, rowId])) as UseHasRowFunction

export const useHasTable = ((tableId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, TABLE, ReturnType.Boolean, [tableId])) as UseHasTableFunction

export const useHasTableCell = ((tableId: MaybeRefOrGetter<Id>, cellId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, TABLE + CELL, ReturnType.Boolean, [tableId, cellId])) as UseHasTableCellFunction

export const useHasTables = (() =>
  useListenable(injectStore() as any, TABLES, ReturnType.Boolean, [])) as UseHasTablesFunction

export const useHasValue = ((valueId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, VALUE, ReturnType.Boolean, [valueId])) as UseHasValueFunction

export const useHasValues = (() =>
  useListenable(injectStore() as any, VALUES, ReturnType.Boolean, [])) as UseHasValuesFunction

export const useRow = ((tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, ROW, ReturnType.Object, [tableId, rowId])) as UseRowFunction

export const useRowCount = ((tableId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, ROW_COUNT, ReturnType.Number, [tableId])) as UseRowCountFunction

export const useRowIds = ((tableId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, ROW_IDS, ReturnType.Array, [tableId])) as UseRowIdsFunction

export const useSortedRowIds = ((
  tableId: MaybeRefOrGetter<Id>,
  cellId?: MaybeRefOrGetter<Id | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
) =>
  useListenable(injectStore() as any, SORTED_ROW_IDS, ReturnType.Array, [
    tableId,
    cellId,
    descending,
    () => toValue(offset) ?? 0,
    limit,
  ])) as UseSortedRowIdsFunction

export const useTable = ((tableId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, TABLE, ReturnType.Object, [tableId])) as UseTableFunction

export const useTableCellIds = ((tableId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, TABLE + CELL_IDS, ReturnType.Array, [tableId])) as UseTableCellIdsFunction

export const useTableIds = (() =>
  useListenable(injectStore() as any, TABLE_IDS, ReturnType.Array)) as UseTableIdsFunction

export const useTables = (() => useListenable(injectStore() as any, TABLES, ReturnType.Object)) as UseTablesFunction

export const useValue = ((valueId: MaybeRefOrGetter<Id>) =>
  useListenable(injectStore() as any, VALUE, ReturnType.CellOrValue, [valueId])) as UseValueFunction

export const useValueIds = (() =>
  useListenable(injectStore() as any, VALUE_IDS, ReturnType.Array)) as UseValueIdsFunction

export const useValues = (() => useListenable(injectStore() as any, VALUES, ReturnType.Object)) as UseValuesFunction
