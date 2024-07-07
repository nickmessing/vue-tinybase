import type { ExtractTablesSchemaFromStore, ExtractValuesSchemaFromStore } from '../../_internal/common.js'
import type {
  CellIdFromSchema,
  DefaultedValueFromSchema,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../_internal/index.js'
import type { ComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'
import type { CellOrUndefined, Ids, Row, Store, Table, Tables, Values } from 'tinybase/with-schemas'

export type UseCellFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
) => ComputedRef<CellOrUndefined<ExtractTablesSchemaFromStore<S>, TableId, CellId>>

export type UseCellIdsFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId>[]>

export type UseHasCellFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: CellId,
) => ComputedRef<boolean>

export type UseHasRowFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<boolean>

export type UseHasTableFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
) => ComputedRef<boolean>

export type UseHasTableCellFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  cellId: MaybeRefOrGetter<CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId>>,
) => ComputedRef<boolean>

export type UseHasTablesFunction = (store: Store<any>) => ComputedRef<boolean>

export type UseHasValueFunction = <
  S extends Store<any>,
  ValueId extends ValueIdFromSchema<ExtractValuesSchemaFromStore<S>>,
>(
  store: S,
  valueId: MaybeRefOrGetter<ValueId>,
) => ComputedRef<boolean>

export type UseHasValuesFunction = (store: Store<any>) => ComputedRef<boolean>

export type UseRowFunction = <S extends Store<any>, TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => ComputedRef<Row<ExtractTablesSchemaFromStore<S>, TableId>>

export type UseRowCountFunction = <S extends Store<any>>(
  store: S,
  tableId: TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
) => ComputedRef<number>

export type UseRowIdsFunction = <S extends Store<any>>(
  store: S,
  tableId: TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
) => ComputedRef<Ids>

export type UseSortedRowIdsFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  cellId?: MaybeRefOrGetter<CellId | undefined>,
  descending?: MaybeRefOrGetter<boolean | undefined>,
  offset?: MaybeRefOrGetter<number | undefined>,
  limit?: MaybeRefOrGetter<number | undefined>,
) => ComputedRef<Ids>

export type UseTableFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
) => ComputedRef<Table<ExtractTablesSchemaFromStore<S>, TableId>>

export type UseTableCellIdsFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
) => ComputedRef<CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId>[]>

export type UseTableIdsFunction = <S extends Store<any>>(
  store: S,
) => ComputedRef<TableIdFromSchema<ExtractTablesSchemaFromStore<S>>[]>

export type UseTablesFunction = <S extends Store<any>>(store: S) => ComputedRef<Tables<ExtractTablesSchemaFromStore<S>>>

export type UseValueFunction = <
  S extends Store<any>,
  ValueId extends ValueIdFromSchema<ExtractValuesSchemaFromStore<S>>,
>(
  store: S,
  valueId: MaybeRefOrGetter<ValueId>,
) => ComputedRef<DefaultedValueFromSchema<ExtractValuesSchemaFromStore<S>, ValueId>>

export type UseValueIdsFunction = <S extends Store<any>>(
  store: S,
) => ComputedRef<ValueIdFromSchema<ExtractValuesSchemaFromStore<S>>[]>

export type UseValuesFunction = <S extends Store<any>>(store: S) => ComputedRef<Values<ExtractValuesSchemaFromStore<S>>>
