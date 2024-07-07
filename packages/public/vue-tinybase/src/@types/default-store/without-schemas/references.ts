import type { WritableComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id, CellOrUndefined, Row, Table, Tables, ValueOrUndefined, Values } from 'tinybase'

export type CellReferenceFunction = (
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => WritableComputedRef<CellOrUndefined>

export type RowReferenceFunction = (
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
) => WritableComputedRef<Row>

export type TableReferenceFunction = (tableId: MaybeRefOrGetter<Id>) => WritableComputedRef<Table>

export type TablesReferenceFunction = () => WritableComputedRef<Tables>

export type ValueReferenceFunction = (valueId: MaybeRefOrGetter<Id>) => WritableComputedRef<ValueOrUndefined>

export type ValuesReferenceFunction = () => WritableComputedRef<Values>
