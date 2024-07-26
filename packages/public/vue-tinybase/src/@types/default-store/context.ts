import type {
  ExtractSchemasFromStore,
  ExtractTablesSchemaFromSchema,
  ExtractValuesSchemaFromSchema,
} from '../_internal/common.js'
import type { OptionalSchemas, Store as TypedStore, Checkpoints as TypedCheckpoints } from 'tinybase/with-schemas'

// Extend this interface to type the default store
export interface VueTinybaseContext {}

export type DefaultStore = VueTinybaseContext extends { store: infer Store } ? Store : TypedStore<OptionalSchemas>
export type DefaultCheckpoints = VueTinybaseContext extends { checkpoints: infer Checkpoints }
  ? Checkpoints
  : TypedCheckpoints<OptionalSchemas>

export type DefaultStoreSchemas = ExtractSchemasFromStore<DefaultStore>
export type DefaultStoreValuesSchema = ExtractValuesSchemaFromSchema<DefaultStoreSchemas>
export type DefaultStoreTablesSchema = ExtractTablesSchemaFromSchema<DefaultStoreSchemas>
