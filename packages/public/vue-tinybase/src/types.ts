import type { Store as UntypedStore } from 'tinybase'
import type { OptionalSchemas, Store as TypedStore } from 'tinybase/with-schemas'

export interface VueTinybaseContext {}

export type AnyStore = UntypedStore | TypedStore<any>
export type DefaultStore = VueTinybaseContext extends { store: infer Store } ? Store : TypedStore<OptionalSchemas>

export type ExtractSchemasFromStore<Store extends AnyStore> =
  Store extends TypedStore<infer Schema> ? Schema : OptionalSchemas

export type ExtractValuesSchemaFromSchema<Schema extends OptionalSchemas> = Schema[1]
export type ExtractValuesSchemaFromStore<Store extends AnyStore> = ExtractValuesSchemaFromSchema<
  ExtractSchemasFromStore<Store>
>

export type ExtractTablesSchemaFromSchema<Schema extends OptionalSchemas> = Schema[0]
export type ExtractTablesSchemaFromStore<Store extends AnyStore> = ExtractTablesSchemaFromSchema<
  ExtractSchemasFromStore<Store>
>

export type DefaultStoreSchemas = ExtractSchemasFromStore<DefaultStore>
export type DefaultStoreValuesSchema = ExtractValuesSchemaFromSchema<DefaultStoreSchemas>
export type DefaultStoreTablesSchema = ExtractTablesSchemaFromSchema<DefaultStoreSchemas>

export type AnyValue = string | number | boolean
export type AnyRow = Record<string, AnyValue>
export type AnyTable = Record<string, AnyRow>

export { type Store as UntypedStore } from 'tinybase'
export { type Store as TypedStore } from 'tinybase/with-schemas'
