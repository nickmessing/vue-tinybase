import type {
  CellReferenceFunction as CellReferenceFunctionWithSchemas,
  RowReferenceFunction as RowReferenceFunctionWithSchemas,
  TableReferenceFunction as TableReferenceFunctionWithSchemas,
  TablesReferenceFunction as TablesReferenceFunctionWithSchemas,
  ValueReferenceFunction as ValueReferenceFunctionWithSchemas,
  ValuesReferenceFunction as ValuesReferenceFunctionWithSchemas,
} from './with-schemas/references.js'
import type {
  CellReferenceFunction as CellReferenceFunctionWithoutSchemas,
  RowReferenceFunction as RowReferenceFunctionWithoutSchemas,
  TableReferenceFunction as TableReferenceFunctionWithoutSchemas,
  TablesReferenceFunction as TablesReferenceFunctionWithoutSchemas,
  ValueReferenceFunction as ValueReferenceFunctionWithoutSchemas,
  ValuesReferenceFunction as ValuesReferenceFunctionWithoutSchemas,
} from './without-schemas/references.js'

export type CellReferenceFunction = CellReferenceFunctionWithSchemas & CellReferenceFunctionWithoutSchemas
export type RowReferenceFunction = RowReferenceFunctionWithSchemas & RowReferenceFunctionWithoutSchemas
export type TableReferenceFunction = TableReferenceFunctionWithSchemas & TableReferenceFunctionWithoutSchemas
export type TablesReferenceFunction = TablesReferenceFunctionWithSchemas & TablesReferenceFunctionWithoutSchemas
export type ValueReferenceFunction = ValueReferenceFunctionWithSchemas & ValueReferenceFunctionWithoutSchemas
export type ValuesReferenceFunction = ValuesReferenceFunctionWithSchemas & ValuesReferenceFunctionWithoutSchemas

export type {
  CellReferenceFunction as CellReferenceFunctionWithSchemas,
  RowReferenceFunction as RowReferenceFunctionWithSchemas,
  TableReferenceFunction as TableReferenceFunctionWithSchemas,
  TablesReferenceFunction as TablesReferenceFunctionWithSchemas,
  ValueReferenceFunction as ValueReferenceFunctionWithSchemas,
  ValuesReferenceFunction as ValuesReferenceFunctionWithSchemas,
} from './with-schemas/references.js'
export type {
  CellReferenceFunction as CellReferenceFunctionWithoutSchemas,
  RowReferenceFunction as RowReferenceFunctionWithoutSchemas,
  TableReferenceFunction as TableReferenceFunctionWithoutSchemas,
  TablesReferenceFunction as TablesReferenceFunctionWithoutSchemas,
  ValueReferenceFunction as ValueReferenceFunctionWithoutSchemas,
  ValuesReferenceFunction as ValuesReferenceFunctionWithoutSchemas,
} from './without-schemas/references.js'
