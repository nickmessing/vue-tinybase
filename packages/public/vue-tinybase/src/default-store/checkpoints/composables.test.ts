import { mount } from '@vue/test-utils'
import { createStore, createCheckpoints } from 'tinybase'
import { expect, test } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'

import { providerWrapper } from '../../test-utils/store.js'

import { useCheckpoint, useCheckpointIds } from './composables.js'

test('[default-store/checkpoints/composables] useCheckpoint', async () => {
  const store = createStore()
  const checkpoints = createCheckpoints(store)

  const Component = defineComponent({
    setup() {
      const checkpoint = useCheckpoint('1')

      return () => h('div', [checkpoint.value])
    },
  })

  const wrapper = mount(providerWrapper(Component, undefined, { checkpoints }))
  expect(wrapper.text()).toBe('')

  store.setCell('pets', 'fido', 'sold', true)
  checkpoints.addCheckpoint('sale')

  await nextTick()

  expect(wrapper.text()).toBe('sale')
})

test('[default-store/checkpoints/composables] useCheckpointIds', async () => {
  const store = createStore()
  const checkpoints = createCheckpoints(store)

  const Component = defineComponent({
    setup() {
      const checkpoint = useCheckpointIds()

      return () => h('div', [JSON.stringify(checkpoint.value)])
    },
  })

  const wrapper = mount(providerWrapper(Component, undefined, { checkpoints }))
  expect(wrapper.text()).toBe('[[],"0",[]]')

  store.setCell('pets', 'fido', 'sold', true)
  checkpoints.addCheckpoint('sale')

  await nextTick()

  expect(wrapper.text()).toBe('[["0"],"1",[]]')
})
