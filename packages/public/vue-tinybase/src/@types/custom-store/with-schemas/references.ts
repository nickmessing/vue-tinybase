import type { ExtractTablesSchemaFromStore, ExtractValuesSchemaFromStore } from '../../_internal/common.js'
import type {
  CellIdFromSchema,
  DefaultedValueFromSchema,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../_internal/index.js'
import type { WritableComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'
import type { CellOrUndefined, Row, Store, Table, Tables, Values } from 'tinybase/with-schemas'

export type CellReferenceFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
  CellId extends CellIdFromSchema<ExtractTablesSchemaFromStore<S>, TableId>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
) => WritableComputedRef<CellOrUndefined<ExtractTablesSchemaFromStore<S>, TableId, CellId>>

export type RowReferenceFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => WritableComputedRef<Row<ExtractTablesSchemaFromStore<S>, TableId>>

export type TableReferenceFunction = <
  S extends Store<any>,
  TableId extends TableIdFromSchema<ExtractTablesSchemaFromStore<S>>,
>(
  store: S,
  tableId: MaybeRefOrGetter<TableId>,
) => WritableComputedRef<Table<ExtractTablesSchemaFromStore<S>, TableId>>

export type TablesReferenceFunction = <S extends Store<any>>(
  store: S,
) => WritableComputedRef<Tables<ExtractTablesSchemaFromStore<S>>>

export type ValueReferenceFunction = <
  S extends Store<any>,
  ValueId extends ValueIdFromSchema<ExtractValuesSchemaFromStore<S>>,
>(
  store: S,
  valueId: MaybeRefOrGetter<ValueId>,
) => WritableComputedRef<DefaultedValueFromSchema<ExtractValuesSchemaFromStore<S>, ValueId>>

export type ValuesReferenceFunction = <S extends Store<any>>(
  store: S,
) => WritableComputedRef<Values<ExtractValuesSchemaFromStore<S>>>
