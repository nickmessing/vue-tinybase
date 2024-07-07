import { provideStore as provideStoreCS, injectStore as injectStoreCS } from '../../custom-store/store/context.js'

import type { DefaultStore } from '../../@types/default-store/context.js'
import type { InjectionKey } from '@vue/runtime-core'

export const DefaultStoreKey: InjectionKey<DefaultStore> = Symbol('DefaultStoreKey')

export function provideStore(store: DefaultStore) {
  return provideStoreCS(DefaultStoreKey, store)
}

export function injectStore(shouldFailOnNotFound?: true): DefaultStore
export function injectStore(shouldFailOnNotFound: false): DefaultStore | undefined
export function injectStore(shouldFailOnNotFound = true): DefaultStore | undefined {
  return injectStoreCS(DefaultStoreKey, shouldFailOnNotFound as false)
}
