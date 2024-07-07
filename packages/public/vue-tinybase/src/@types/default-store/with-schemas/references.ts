import type {
  CellIdFromSchema,
  DefaultedValueFromSchema,
  TableIdFromSchema,
  ValueIdFromSchema,
} from '../../_internal/index.js'
import type { DefaultStoreTablesSchema, DefaultStoreValuesSchema } from '../context.js'
import type { WritableComputedRef, MaybeRefOrGetter } from '@vue/reactivity'
import type { Id } from 'tinybase'
import type { CellOrUndefined, Row, Table, Tables, Values } from 'tinybase/with-schemas'

export type CellReferenceFunction = <
  TableId extends TableIdFromSchema<DefaultStoreTablesSchema>,
  CellId extends CellIdFromSchema<DefaultStoreTablesSchema, TableId>,
>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
  cellId: MaybeRefOrGetter<CellId>,
) => WritableComputedRef<CellOrUndefined<DefaultStoreTablesSchema, TableId, CellId>>

export type RowReferenceFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
  rowId: MaybeRefOrGetter<Id>,
) => WritableComputedRef<Row<DefaultStoreTablesSchema, TableId>>

export type TableReferenceFunction = <TableId extends TableIdFromSchema<DefaultStoreTablesSchema>>(
  tableId: MaybeRefOrGetter<TableId>,
) => WritableComputedRef<Table<DefaultStoreTablesSchema, TableId>>

export type TablesReferenceFunction = () => WritableComputedRef<Tables<DefaultStoreTablesSchema>>

export type ValueReferenceFunction = <ValueId extends ValueIdFromSchema<DefaultStoreValuesSchema>>(
  valueId: MaybeRefOrGetter<ValueId>,
) => WritableComputedRef<DefaultedValueFromSchema<DefaultStoreValuesSchema, ValueId>>

export type ValuesReferenceFunction = () => WritableComputedRef<Values<DefaultStoreValuesSchema>>
