import type { WritableComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Store, Id, CellOrUndefined, Row, Table, Tables, ValueOrUndefined, Values } from 'tinybase'

export type CellReferenceFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => WritableComputedRef<CellOrUndefined>

export type RowReferenceFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
) => WritableComputedRef<Row>

export type TableReferenceFunction = (store: Store, tableId: MaybeRefOrGetter<Id>) => WritableComputedRef<Table>

export type TablesReferenceFunction = (store: Store) => WritableComputedRef<Tables>

export type ValueReferenceFunction = (
  store: Store,
  valueId: MaybeRefOrGetter<Id>,
) => WritableComputedRef<ValueOrUndefined>

export type ValuesReferenceFunction = (store: Store) => WritableComputedRef<Values>
