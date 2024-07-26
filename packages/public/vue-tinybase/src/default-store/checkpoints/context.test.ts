import { mount } from '@vue/test-utils'
import { createCheckpoints } from 'tinybase/with-schemas'
import { expect, test } from 'vitest'
import { defineComponent, h } from 'vue'

import { store, providerWrapper } from '../../test-utils/store.js'

import { injectCheckpoints } from './context.js'

test('[default-store/checkpoints/context] inject', () => {
  const checkpoints = createCheckpoints(store)

  const Component = defineComponent({
    setup() {
      const checkpoints = injectCheckpoints()

      const value = checkpoints.getCheckpointIds()

      return () => h('div', null, JSON.stringify(value))
    },
  })

  expect(() => mount(Component)).toThrowError(
    '[tinybase-vue] (injectCheckpoints): Could not find checkpoints object with key Symbol(DefaultCheckpointsKey)',
  )

  const wrapper = mount(
    providerWrapper(Component, undefined, {
      checkpoints,
    }),
  )

  expect(wrapper.text()).toBe('[[],"0",[]]')
})
