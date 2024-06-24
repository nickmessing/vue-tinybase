import type {
  ExtractSchemasFromStore,
  ExtractTablesSchemaFromSchema,
  ExtractValuesSchemaFromSchema,
} from './custom-store/types.js'
import type { OptionalSchemas, Store as TypedStore } from 'tinybase/with-schemas'

// Extend this interface to type the default store
export interface VueTinybaseContext {}

export type DefaultStore = VueTinybaseContext extends { store: infer Store } ? Store : TypedStore<OptionalSchemas>

export type DefaultStoreSchemas = ExtractSchemasFromStore<DefaultStore>
export type DefaultStoreValuesSchema = ExtractValuesSchemaFromSchema<DefaultStoreSchemas>
export type DefaultStoreTablesSchema = ExtractTablesSchemaFromSchema<DefaultStoreSchemas>

export {
  type ExtractValuesSchemaFromStore,
  type ExtractTablesSchemaFromStore,
  type AnyValue,
  type AnyRow,
  type AnyTable,
  type ExtractSchemasFromStore,
  type AnyStore,
  type ExtractValuesSchemaFromSchema,
  type ExtractTablesSchemaFromSchema,
} from './custom-store/types.js'
export { type Store as UntypedStore } from 'tinybase'
export { type Store as TypedStore } from 'tinybase/with-schemas'
