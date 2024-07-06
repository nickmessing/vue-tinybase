import { InjectionKey, defineComponent, h } from 'vue'
import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { provideStore } from './provideStore.js'
import { injectStore } from './injectStore.js'
import { store, Store } from '../../test-store/store.js'

test('[custom-store/context] (provideStore + injectStore) happy-path', () => {
  const StoreKey = Symbol('InjectedStore') as InjectionKey<Store>

  const ChildComponent = defineComponent({
    setup() {
      const store = injectStore(StoreKey)

      const theme = store.getValue('theme')

      return () => h('div', null, `${theme}`)
    },
  })

  const ParentComponent = defineComponent({
    setup() {
      provideStore(StoreKey, store)

      return () => h(ChildComponent)
    },
  })

  const wrapper = mount(ParentComponent)

  expect(wrapper.text()).toBe('light')
})

test('[custom-store/context] (injectStore) missing store in context', () => {
  const StoreKey = Symbol('NonExistentStore')

  const ChildComponent = defineComponent({
    setup() {
      injectStore(StoreKey)
      return () => h('div')
    },
  })

  const fn = () => mount(ChildComponent)

  expect(fn).toThrowError('[tinybase-vue] (injectStore): Could not find store with key Symbol(NonExistentStore)')
})
