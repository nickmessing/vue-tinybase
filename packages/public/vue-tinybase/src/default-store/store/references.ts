import { CELL, ROW, TABLE, TABLES, VALUE, VALUES } from '../../common/strings.js'
import { ReturnType } from '../../common/useListenable.js'
import { useWritableListenable } from '../../common/useWritableListenable.js'

import { injectStore } from './context.js'

import type {
  CellReferenceFunction,
  RowReferenceFunction,
  TableReferenceFunction,
  TablesReferenceFunction,
  ValueReferenceFunction,
  ValuesReferenceFunction,
} from '../../@types/default-store/index.js'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'

export const cellRef = ((tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>, cellId: MaybeRefOrGetter<Id>) =>
  useWritableListenable(injectStore(), CELL, ReturnType.CellOrValue, [tableId, rowId, cellId])) as CellReferenceFunction

export const rowRef = ((tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) =>
  useWritableListenable(injectStore(), ROW, ReturnType.Object, [tableId, rowId])) as RowReferenceFunction

export const tableRef = ((tableId: MaybeRefOrGetter<Id>) =>
  useWritableListenable(injectStore(), TABLE, ReturnType.Object, [tableId])) as TableReferenceFunction

export const tablesRef = (() =>
  useWritableListenable(injectStore(), TABLES, ReturnType.Object)) as TablesReferenceFunction

export const valueRef = ((valueId: MaybeRefOrGetter<Id>) =>
  useWritableListenable(injectStore(), VALUE, ReturnType.CellOrValue, [valueId])) as ValueReferenceFunction

export const valuesRef = (() =>
  useWritableListenable(injectStore(), VALUES, ReturnType.Object)) as ValuesReferenceFunction
