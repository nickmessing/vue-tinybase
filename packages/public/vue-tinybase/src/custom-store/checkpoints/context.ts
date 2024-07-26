import { provide, inject } from '@vue/runtime-core'

import type { AnyCheckpoints } from '../../@types/_internal/common.js'
import type { InjectionKey } from '@vue/runtime-core'

export function provideCheckpoints<T extends AnyCheckpoints>(checkpointsKey: InjectionKey<T>, checkpoints: T) {
  return provide(checkpointsKey, checkpoints)
}

export function injectCheckpoints<T extends AnyCheckpoints>(
  checkpointsKey: InjectionKey<T>,
  shouldFailOnNotFound?: true,
): T
export function injectCheckpoints<T extends AnyCheckpoints>(
  checkpointsKey: InjectionKey<T>,
  shouldFailOnNotFound: false,
): T | undefined
export function injectCheckpoints<T extends AnyCheckpoints>(
  checkpointsKey: InjectionKey<T>,
  shouldFailOnNotFound = true,
): T | undefined {
  const checkpoints = inject(checkpointsKey)

  if (shouldFailOnNotFound && !checkpoints) {
    throw new Error(
      `[tinybase-vue] (injectCheckpoints): Could not find checkpoints object with key ${String(checkpointsKey)}`,
    )
  }

  return checkpoints
}
