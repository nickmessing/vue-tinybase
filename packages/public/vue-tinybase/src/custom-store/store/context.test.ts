import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h } from 'vue'

import { providerWrapper } from '../../test-utils/store.js'

import { injectStore } from './context.js'

import type { Store } from '../../test-utils/store.js'
import type { InjectionKey } from 'vue'

test('[custom-store/store/context] inject', () => {
  const key = Symbol('store') as InjectionKey<Store>

  const Component = defineComponent({
    setup() {
      const store = injectStore(key)

      const value = store.getValue('theme')

      return () => h('div', null, value)
    },
  })

  expect(() => mount(Component)).toThrowError(
    '[tinybase-vue] (injectStore): Could not find store with key Symbol(store)',
  )

  const wrapper = mount(providerWrapper(Component, key))

  expect(wrapper.text()).toBe('light')
})
