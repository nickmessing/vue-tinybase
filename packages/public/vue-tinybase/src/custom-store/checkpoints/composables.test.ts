import { mount } from '@vue/test-utils'
import { createStore, createCheckpoints } from 'tinybase'
import { expect, test } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'

import { useCheckpoint } from './composables.js'

test('[custom-store/checkpoints/composables] useCheckpoint', async () => {
  const store = createStore()
  const checkpoints = createCheckpoints(store)

  const Component = defineComponent({
    setup() {
      const checkpoint = useCheckpoint(checkpoints, '1')

      return () => h('div', [checkpoint.value])
    },
  })

  const wrapper = mount(Component)
  expect(wrapper.text()).toBe('')

  store.setCell('pets', 'fido', 'sold', true)
  checkpoints.addCheckpoint('sale')

  await nextTick()

  expect(wrapper.text()).toBe('sale')
})
