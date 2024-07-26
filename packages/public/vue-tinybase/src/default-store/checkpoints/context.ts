import {
  provideCheckpoints as provideCheckpointsCS,
  injectCheckpoints as injectCheckpointsCS,
} from '../../custom-store/checkpoints/context.js'

import type { DefaultCheckpoints } from '../../@types/default-store/context.js'
import type { InjectionKey } from '@vue/runtime-core'

export const DefaultCheckpointsKey: InjectionKey<DefaultCheckpoints> = Symbol('DefaultCheckpointsKey')

export function provideCheckpoints(checkpoints: DefaultCheckpoints) {
  return provideCheckpointsCS(DefaultCheckpointsKey, checkpoints)
}

export function injectCheckpoints(shouldFailOnNotFound?: true): DefaultCheckpoints
export function injectCheckpoints(shouldFailOnNotFound: false): DefaultCheckpoints | undefined
export function injectCheckpoints(shouldFailOnNotFound = true): DefaultCheckpoints | undefined {
  return injectCheckpointsCS(DefaultCheckpointsKey, shouldFailOnNotFound as false)
}
