import { DefaultStoreKey } from '../constants.js'
import { injectStore as injectStoreCS } from '../custom-store/context/injectStore.js'

import type { DefaultStore } from '../types.js'

export function injectStore(shouldFailOnNotFound?: true): DefaultStore
export function injectStore(shouldFailOnNotFound: false): DefaultStore | undefined
export function injectStore(shouldFailOnNotFound = true): DefaultStore | undefined {
  // Because function is overloaded - casting it as "false" will branch to a single function declaration and pass TS check
  // I know this is a hack, feels safe-ish here
  return injectStoreCS(DefaultStoreKey, shouldFailOnNotFound as false)
}
