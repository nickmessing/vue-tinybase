import type { Store as UntypedStore } from 'tinybase'
import type { OptionalSchemas, Store as TypedStore } from 'tinybase/with-schemas'

export type AnyStore = UntypedStore | TypedStore<any>

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

export { type Store as UntypedStore } from 'tinybase'
export { type Store as TypedStore } from 'tinybase/with-schemas'
