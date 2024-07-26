import { mount } from '@vue/test-utils'
import { createCheckpoints } from 'tinybase/with-schemas'
import { expect, test } from 'vitest'
import { defineComponent, h } from 'vue'

import { store, providerWrapper } from '../../test-utils/store.js'

import { injectCheckpoints } from './context.js'

import type { Checkpoints } from 'tinybase/with-schemas'
import type { InjectionKey } from 'vue'

test('[custom-store/checkpoints/context] inject', () => {
  const checkpointsKey = Symbol('checkpoints') as InjectionKey<Checkpoints<any>>
  const checkpoints = createCheckpoints(store)

  const Component = defineComponent({
    setup() {
      const checkpoints = injectCheckpoints(checkpointsKey)

      const value = checkpoints.getCheckpointIds()

      return () => h('div', null, JSON.stringify(value))
    },
  })

  expect(() => mount(Component)).toThrowError(
    '[tinybase-vue] (injectCheckpoints): Could not find checkpoints object with key Symbol(checkpoints)',
  )

  const wrapper = mount(
    providerWrapper(Component, undefined, {
      checkpoints,
      checkpointsKey,
    }),
  )

  expect(wrapper.text()).toBe('[[],"0",[]]')
})
