import type { DefaultStore } from './types.js'
import type { InjectionKey } from '@vue/runtime-core'

export const DefaultStoreKey: InjectionKey<DefaultStore> = Symbol('DefaultStoreKey')
