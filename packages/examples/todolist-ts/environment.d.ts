/// <reference types="vite/client" />

declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  // eslint-disable-next-line import/no-default-export
  export default component
}

declare module 'vue-tinybase/typed' {
  import type { Store } from '@/store'
  import type {
    TypedUseCellFunction,
    TypedUseRowFunction,
    TypedUseStoreFunction,
    TypedUseTableFunction,
    TypedUseTablesFunction,
    TypedUseValueFunction,
    TypedUseValuesFunction,
  } from 'vue-tinybase'

  export const useStore: TypedUseStoreFunction<Store>
  export const useValues: TypedUseValuesFunction<Store>
  export const useValue: TypedUseValueFunction<Store>
  export const useTables: TypedUseTablesFunction<Store>
  export const useTable: TypedUseTableFunction<Store>
  export const useRow: TypedUseRowFunction<Store>
  export const useCell: TypedUseCellFunction<Store>
}
