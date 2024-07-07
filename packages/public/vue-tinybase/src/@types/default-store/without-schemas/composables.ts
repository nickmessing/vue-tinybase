import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id, CellOrUndefined, Ids, Row, Table, Tables, ValueOrUndefined, Values } from 'tinybase'

export type UseCellFunction = (
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => ComputedRef<CellOrUndefined>

export type UseCellIdsFunction = (tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) => ComputedRef<Ids>

export type UseHasCellFunction = (
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => ComputedRef<boolean>

export type UseHasRowFunction = (tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) => ComputedRef<boolean>

export type UseHasTableFunction = (tableId: MaybeRefOrGetter<Id>) => ComputedRef<boolean>

export type UseHasTableCellFunction = (
  tableId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => ComputedRef<boolean>

export type UseHasTablesFunction = () => ComputedRef<boolean>

export type UseHasValueFunction = (valueId: MaybeRefOrGetter<Id>) => ComputedRef<boolean>

export type UseHasValuesFunction = () => ComputedRef<boolean>

export type UseRowFunction = (tableId: MaybeRefOrGetter<Id>, rowId: MaybeRefOrGetter<Id>) => ComputedRef<Row>

export type UseRowCountFunction = (tableId: MaybeRefOrGetter<Id>) => ComputedRef<number>

export type UseRowIdsFunction = (tableId: MaybeRefOrGetter<Id>) => ComputedRef<Ids>

export type UseSortedRowIdsFunction = (
  tableId: MaybeRefOrGetter<Id>,
  cellId?: MaybeRefOrGetter<Id | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
) => ComputedRef<Ids>

export type UseTableFunction = (tableId: MaybeRefOrGetter<Id>) => ComputedRef<Table>

export type UseTableCellIdsFunction = (tableId: MaybeRefOrGetter<Id>) => ComputedRef<Ids>

export type UseTableIdsFunction = () => ComputedRef<Ids>

export type UseTablesFunction = () => ComputedRef<Tables>

export type UseValueFunction = (valueId: MaybeRefOrGetter<Id>) => ComputedRef<ValueOrUndefined>

export type UseValueIdsFunction = () => ComputedRef<Ids>

export type UseValuesFunction = () => ComputedRef<Values>
