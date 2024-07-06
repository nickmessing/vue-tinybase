import { InjectionKey, defineComponent, h } from 'vue'
import { expect, test } from 'vitest'
import { createStore } from 'tinybase'
import { mount } from '@vue/test-utils'
import { provideStore } from './provideStore.js'
import { injectStore } from './injectStore.js'

test('[default-store/context] (provideStore + injectStore) happy-path', () => {
  const store = createStore().setValue('foo', 'bar')

  const ChildComponent = defineComponent({
    setup() {
      const store = injectStore()

      const value = store.getValue('foo')

      return () => h('div', null, `${value}`)
    },
  })

  const ParentComponent = defineComponent({
    setup() {
      provideStore(store as any)

      return () => h(ChildComponent)
    },
  })

  const wrapper = mount(ParentComponent)

  expect(wrapper.text()).toBe('bar')
})

test('[default-store/context] (injectStore) missing store in context', () => {
  const ChildComponent = defineComponent({
    setup() {
      injectStore()
      return () => h('div')
    },
  })

  const fn = () => mount(ChildComponent)

  expect(fn).toThrowError('[tinybase-vue] (injectStore): Could not find store with key Symbol(DefaultStoreKey)')
})
