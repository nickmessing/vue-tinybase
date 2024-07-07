import type { Ref } from '@vue/reactivity'
import type { Store as StoreWithoutSchemas, Id, IdOrNull } from 'tinybase'
import type { OptionalSchemas, Store as StoreWithSchemas } from 'tinybase/with-schemas'

export type AnyStore = StoreWithoutSchemas | StoreWithSchemas<any>

export type ExtractSchemasFromStore<Store extends AnyStore> =
  Store extends StoreWithSchemas<infer Schema> ? Schema : OptionalSchemas

export type ExtractValuesSchemaFromSchema<Schema extends OptionalSchemas> = Schema[1]
export type ExtractValuesSchemaFromStore<Store extends AnyStore> = ExtractValuesSchemaFromSchema<
  ExtractSchemasFromStore<Store>
>

export type ExtractTablesSchemaFromSchema<Schema extends OptionalSchemas> = Schema[0]
export type ExtractTablesSchemaFromStore<Store extends AnyStore> = ExtractTablesSchemaFromSchema<
  ExtractSchemasFromStore<Store>
>

export type AnyValue = string | number | boolean
export type AnyRow = Record<string, AnyValue>
export type AnyTable = Record<string, AnyRow>

export type ListenerArgument = IdOrNull | boolean | number | undefined

export type UseListenerOptions = {
  immediate?: boolean
}
export type UseListenerResult = {
  stopListening: () => void
  startListening: () => void
  listenerId: Ref<Id>
  isListening: Ref<boolean>
}
