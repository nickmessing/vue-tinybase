import { InjectionKey, defineComponent, h } from 'vue'
import { expect, test } from 'vitest'
import { createStore } from 'tinybase'
import { mount } from '@vue/test-utils'
import { provideStore } from './provideStore.js'
import { injectStore } from './injectStore.js'

test('[custom-store/context] (provideStore + injectStore) happy-path', () => {
  const store1 = createStore().setValue('foo', 'bar')
  const store2 = createStore().setValue('foo', 'baz')
  const store1Key = Symbol('store1') as InjectionKey<typeof store1>
  const store2Key = Symbol('store2') as InjectionKey<typeof store2>

  const ChildComponent = defineComponent({
    setup() {
      const store1 = injectStore(store1Key)
      const store2 = injectStore(store2Key)

      const value1 = store1.getValue('foo')
      const value2 = store2.getValue('foo')

      return () => h('div', null, `${value1} ${value2}`)
    },
  })

  const ParentComponent = defineComponent({
    setup() {
      provideStore(store1Key, store1)
      provideStore(store2Key, store2)

      return () => h(ChildComponent)
    },
  })

  const wrapper = mount(ParentComponent)

  expect(wrapper.text()).toBe('bar baz')
})

test('[custom-store/context] (injectStore) missing store in context', () => {
  const storeKey = Symbol('store1')

  const ChildComponent = defineComponent({
    setup() {
      injectStore(storeKey)
      return () => h('div')
    },
  })

  const fn = () => mount(ChildComponent)

  expect(fn).toThrowError('[tinybase-vue] (injectStore): Could not find store with key Symbol(store1)')
})
