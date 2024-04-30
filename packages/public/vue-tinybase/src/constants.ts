import type { AnyStore } from './types.js'
import type { InjectionKey } from '@vue/runtime-core'

export const DefaultStoreKey: InjectionKey<AnyStore> = Symbol('DefaultStoreKey')
