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
} from '../../@types/custom-store/composables.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Store, Id } from 'tinybase'

export const useCell = ((
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => useListenable(store, CELL, ReturnType.CellOrValue, [tableId, rowId, cellId])) as UseCellFunction

export const useCellIds = ((store: Store, tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useListenable(store, CELL_IDS, ReturnType.Array, [tableId, rowId])) as UseCellIdsFunction

export const useHasCell = ((
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => useListenable(store, CELL, ReturnType.Boolean, [tableId, rowId, cellId])) as UseHasCellFunction

export const useHasRow = ((store: Store, tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useListenable(store, ROW, ReturnType.Boolean, [tableId, rowId])) as UseHasRowFunction

export const useHasTable = ((store: Store, tableId: MaybeRefOrGetter<Id>) =>
  useListenable(store, TABLE, ReturnType.Boolean, [tableId])) as UseHasTableFunction

export const useHasTableCell = ((store: Store, tableId: MaybeRefOrGetter<Id>, cellId: MaybeRefOrGetter<Id>) =>
  useListenable(store, TABLE + CELL, ReturnType.Boolean, [tableId, cellId])) as UseHasTableCellFunction

export const useHasTables = ((store: Store) =>
  useListenable(store, TABLES, ReturnType.Boolean, [])) as UseHasTablesFunction

export const useHasValue = ((store: Store, valueId: MaybeRefOrGetter<Id>) =>
  useListenable(store, VALUE, ReturnType.Boolean, [valueId])) as UseHasValueFunction

export const useHasValues = ((store: Store) =>
  useListenable(store, VALUES, ReturnType.Boolean, [])) as UseHasValuesFunction

export const useRow = ((store: Store, tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useListenable(store, ROW, ReturnType.Object, [tableId, rowId])) as UseRowFunction

export const useRowCount = ((store: Store, tableId: MaybeRefOrGetter<Id>) =>
  useListenable(store, ROW_COUNT, ReturnType.Number, [tableId])) as UseRowCountFunction

export const useRowIds = ((store: Store, tableId: MaybeRefOrGetter<Id>) =>
  useListenable(store, ROW_IDS, ReturnType.Array, [tableId])) as UseRowIdsFunction

export const useSortedRowIds = ((
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  cellId?: MaybeRefOrGetter<Id | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
) =>
  useListenable(store, SORTED_ROW_IDS, ReturnType.Array, [
    tableId,
    cellId,
    descending,
    () => toValue(offset) ?? 0,
    limit,
  ])) as UseSortedRowIdsFunction

export const useTable = ((store: Store, tableId: MaybeRefOrGetter<Id>) =>
  useListenable(store, TABLE, ReturnType.Object, [tableId])) as UseTableFunction

export const useTableCellIds = ((store: Store, tableId: MaybeRefOrGetter<Id>) =>
  useListenable(store, TABLE + CELL_IDS, ReturnType.Array, [tableId])) as UseTableCellIdsFunction

export const useTableIds = ((store: Store) => useListenable(store, TABLE_IDS, ReturnType.Array)) as UseTableIdsFunction

export const useTables = ((store: Store) => useListenable(store, TABLES, ReturnType.Object)) as UseTablesFunction

export const useValue = ((store: Store, valueId: MaybeRefOrGetter<Id>) =>
  useListenable(store, VALUE, ReturnType.CellOrValue, [valueId])) as UseValueFunction

export const useValueIds = ((store: Store) => useListenable(store, VALUE_IDS, ReturnType.Array)) as UseValueIdsFunction

export const useValues = ((store: Store) => useListenable(store, VALUES, ReturnType.Object)) as UseValuesFunction
