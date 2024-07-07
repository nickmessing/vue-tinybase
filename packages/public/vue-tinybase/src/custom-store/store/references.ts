import { CELL, ROW, TABLE, TABLES, VALUE, VALUES } from '../../common/strings.js'
import { ReturnType } from '../../common/useListenable.js'
import { useWritableListenable } from '../../common/useWritableListenable.js'

import type {
  CellReferenceFunction,
  RowReferenceFunction,
  TableReferenceFunction,
  TablesReferenceFunction,
  ValueReferenceFunction,
  ValuesReferenceFunction,
} from '../../@types/custom-store/references.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Store, Id } from 'tinybase'

export const cellRef = ((
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => useWritableListenable(store, CELL, ReturnType.CellOrValue, [tableId, rowId, cellId])) as CellReferenceFunction

export const rowRef = ((store: Store, tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useWritableListenable(store, ROW, ReturnType.Object, [tableId, rowId])) as RowReferenceFunction

export const tableRef = ((store: Store, tableId: MaybeRefOrGetter<Id>) =>
  useWritableListenable(store, TABLE, ReturnType.Object, [tableId])) as TableReferenceFunction

export const tablesRef = ((store: Store) =>
  useWritableListenable(store, TABLES, ReturnType.Object)) as TablesReferenceFunction

export const valueRef = ((store: Store, valueId: MaybeRefOrGetter<Id>) =>
  useWritableListenable(store, VALUE, ReturnType.CellOrValue, [valueId])) as ValueReferenceFunction

export const valuesRef = ((store: Store) =>
  useWritableListenable(store, VALUES, ReturnType.Object)) as ValuesReferenceFunction
