import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Store, Id, CellOrUndefined, Ids, Row, Table, Tables, ValueOrUndefined, Values } from 'tinybase'

export type UseCellFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => ComputedRef<CellOrUndefined>

export type UseCellIdsFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<Ids>

export type UseHasCellFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => ComputedRef<boolean>

export type UseHasRowFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<boolean>

export type UseHasTableFunction = (store: Store, tableId: MaybeRefOrGetter<Id>) => ComputedRef<boolean>

export type UseHasTableCellFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<Id>,
) => ComputedRef<boolean>

export type UseHasTablesFunction = (store: Store) => ComputedRef<boolean>

export type UseHasValueFunction = (store: Store, valueId: MaybeRefOrGetter<Id>) => ComputedRef<boolean>

export type UseHasValuesFunction = (store: Store) => ComputedRef<boolean>

export type UseRowFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<Row>

export type UseRowCountFunction = (store: Store, tableId: MaybeRefOrGetter<Id>) => ComputedRef<number>

export type UseRowIdsFunction = (store: Store, tableId: MaybeRefOrGetter<Id>) => ComputedRef<Ids>

export type UseSortedRowIdsFunction = (
  store: Store,
  tableId: MaybeRefOrGetter<Id>,
  cellId?: MaybeRefOrGetter<Id | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
) => ComputedRef<Ids>

export type UseTableFunction = (store: Store, tableId: MaybeRefOrGetter<Id>) => ComputedRef<Table>

export type UseTableCellIdsFunction = (store: Store, tableId: MaybeRefOrGetter<Id>) => ComputedRef<Ids>

export type UseTableIdsFunction = (store: Store) => ComputedRef<Ids>

export type UseTablesFunction = (store: Store) => ComputedRef<Tables>

export type UseValueFunction = (store: Store, valueId: MaybeRefOrGetter<Id>) => ComputedRef<ValueOrUndefined>

export type UseValueIdsFunction = (store: Store) => ComputedRef<Ids>

export type UseValuesFunction = (store: Store) => ComputedRef<Values>
