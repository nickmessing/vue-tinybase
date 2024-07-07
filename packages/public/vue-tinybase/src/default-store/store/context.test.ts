import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h } from 'vue'

import { providerWrapper } from '../../test-utils/store.js'

import { injectStore } from './context.js'

test('[default-store/store/context] inject', () => {
  const Component = defineComponent({
    setup() {
      const store = injectStore()

      const value = store.getValue('theme')

      return () => h('div', null, value)
    },
  })

  expect(() => mount(Component)).toThrowError(
    '[tinybase-vue] (injectStore): Could not find store with key Symbol(DefaultStoreKey)',
  )

  const wrapper = mount(providerWrapper(Component))

  expect(wrapper.text()).toBe('light')
})
