import { mount } from '@vue/test-utils'
import { createStore } from 'tinybase'
import { expect, test } from 'vitest'
import { computed, defineComponent, h, nextTick, ref } from 'vue'

import { providerWrapper, store } from '../../test-utils/store.js'

import {
  onCellChange,
  onCellIdsChange,
  onDidFinishTransaction,
  onHasCellChange,
  onHasRowChange,
  onHasTableCellChange,
  onHasTableChange,
  onHasTablesChange,
  onHasValueChange,
  onHasValuesChange,
  onRowChange,
  onRowCountChange,
  onRowIdsChange,
  onSortedRowIdsChange,
  onStartTransaction,
  onTableCellIdsChange,
  onTableChange,
  onTableIdsChange,
  onTablesChange,
  onValueChange,
  onValueIdsChange,
  onValuesChange,
  onWillFinishTransaction,
} from './events.js'

test('[default-store/store/events] onCellChange', async () => {
  const Component = defineComponent({
    setup() {
      const tableId = ref<'projects' | 'tasks'>('projects')
      const rowId = computed(() => (tableId.value === 'projects' ? 'p1' : 't1'))
      const cellId = computed<'name' | 'title'>(() => (tableId.value === 'projects' ? 'name' : 'title'))
      const listenerCalledTimes = ref(0)

      onCellChange(tableId, rowId, cellId, () => {
        listenerCalledTimes.value++
      })

      return () =>
        h(
          'button',
          {
            onClick: () => (tableId.value = tableId.value === 'projects' ? 'tasks' : 'projects'),
          },
          `table: ${tableId.value}, events: ${listenerCalledTimes.value}`,
        )
    },
  })

  expect(store.getListenerStats().cell).toBe(0)

  const wrapper = mount(providerWrapper(Component, store))

  expect(wrapper.find('button').text()).toBe('table: projects, events: 0')
  expect(store.getListenerStats().cell).toBe(1)

  store.setCell('tasks', 't1', 'title', 'Some ticket title')
  await nextTick()
  expect(wrapper.find('button').text()).toBe('table: projects, events: 0')

  store.setCell('projects', 'p1', 'name', 'Project Something')
  await nextTick()
  expect(wrapper.find('button').text()).toBe('table: projects, events: 1')

  await wrapper.find('button').trigger('click')

  expect(wrapper.find('button').text()).toBe('table: tasks, events: 1')
  expect(store.getListenerStats().cell).toBe(1)

  store.setCell('projects', 'p1', 'name', 'Project Something Else')
  await nextTick()
  expect(wrapper.find('button').text()).toBe('table: tasks, events: 1')

  store.setCell('tasks', 't1', 'title', 'Some other ticket title')
  await nextTick()
  expect(wrapper.find('button').text()).toBe('table: tasks, events: 2')

  wrapper.unmount()

  expect(store.getListenerStats().cell).toBe(0)
})

// Not testing immediate: false for other events because it's the same implementation
test('[default-store/store/events] onCellChange (immediate: false)', async () => {
  const Component = defineComponent({
    setup() {
      const tableId = ref<'projects' | 'tasks'>('projects')
      const rowId = computed(() => (tableId.value === 'projects' ? 'p1' : 't1'))
      const cellId = computed<'name' | 'title'>(() => (tableId.value === 'projects' ? 'name' : 'title'))
      const listenerCalledTimes = ref(0)

      const { isListening, startListening, stopListening } = onCellChange(
        tableId,
        rowId,
        cellId,
        () => {
          listenerCalledTimes.value++
        },
        { immediate: false },
      )

      return () =>
        h('div', null, [
          h(
            'pre',
            JSON.stringify({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              tableId: tableId.value,
              isListening: isListening.value,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              listenerCalledTimes: listenerCalledTimes.value,
            }),
          ),
          h(
            'button',
            {
              onClick: () => (tableId.value = tableId.value === 'projects' ? 'tasks' : 'projects'),
              id: 'toggle',
            },
            `toggle`,
          ),
          h(
            'button',
            {
              onClick: startListening,
              id: 'startListening',
            },
            `startListening`,
          ),
          h(
            'button',
            {
              onClick: stopListening,
              id: 'stopListening',
            },
            `stopListening`,
          ),
        ])
    },
  })

  expect(store.getListenerStats().cell).toBe(0)

  const wrapper = mount(providerWrapper(Component, store))

  expect(store.getListenerStats().cell).toBe(0)
  expect(wrapper.find('pre').text()).toBe('{"tableId":"projects","isListening":false,"listenerCalledTimes":0}')

  store.setCell('tasks', 't1', 'title', 'Some ticket title')
  await nextTick()
  expect(wrapper.find('pre').text()).toBe('{"tableId":"projects","isListening":false,"listenerCalledTimes":0}')

  store.setCell('projects', 'p1', 'name', 'Project Something')
  await nextTick()
  expect(wrapper.find('pre').text()).toBe('{"tableId":"projects","isListening":false,"listenerCalledTimes":0}')

  await wrapper.find('button#startListening').trigger('click')
  expect(store.getListenerStats().cell).toBe(1)
  expect(wrapper.find('pre').text()).toBe('{"tableId":"projects","isListening":true,"listenerCalledTimes":0}')

  store.setCell('tasks', 't1', 'title', 'Some other ticket title')
  await nextTick()
  expect(wrapper.find('pre').text()).toBe('{"tableId":"projects","isListening":true,"listenerCalledTimes":0}')

  store.setCell('projects', 'p1', 'name', 'Project Something Else')
  await nextTick()
  expect(wrapper.find('pre').text()).toBe('{"tableId":"projects","isListening":true,"listenerCalledTimes":1}')

  await wrapper.find('button#toggle').trigger('click')
  expect(store.getListenerStats().cell).toBe(1)
  expect(wrapper.find('pre').text()).toBe('{"tableId":"tasks","isListening":true,"listenerCalledTimes":1}')

  store.setCell('projects', 'p1', 'name', 'Project Something Else Else')
  await nextTick()
  expect(wrapper.find('pre').text()).toBe('{"tableId":"tasks","isListening":true,"listenerCalledTimes":1}')

  store.setCell('tasks', 't1', 'title', 'Some other other ticket title')
  await nextTick()
  expect(wrapper.find('pre').text()).toBe('{"tableId":"tasks","isListening":true,"listenerCalledTimes":2}')

  await wrapper.find('button#startListening').trigger('click')
  expect(store.getListenerStats().cell).toBe(1)

  await wrapper.find('button#stopListening').trigger('click')
  expect(store.getListenerStats().cell).toBe(0)

  await wrapper.find('button#stopListening').trigger('click')
  expect(store.getListenerStats().cell).toBe(0)
  expect(wrapper.find('pre').text()).toBe('{"tableId":"tasks","isListening":false,"listenerCalledTimes":2}')
})

test('[default-store/store/events] onCellIdsChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onCellIdsChange('pets', null, () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onDidFinishTransaction', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onDidFinishTransaction(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onHasCellChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onHasCellChange('pets', 'fido', 'species', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onHasRowChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onHasRowChange('pets', 'fido', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onHasTableCellChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onHasTableCellChange('pets', 'species', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onHasTableChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onHasTableChange('pets', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onHasTablesChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onHasTablesChange(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onHasValueChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onHasValueChange('key', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setValue('key', 'value')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onHasValuesChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onHasValuesChange(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setValue('key', 'value')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onRowChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onRowChange('pets', 'fido', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onRowCountChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onRowCountChange('pets', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onRowIdsChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onRowIdsChange('pets', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onSortedRowIdsChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onSortedRowIdsChange('pets', undefined, false, 0, 10, () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onStartTransaction', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onStartTransaction(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onTableCellIdsChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onTableCellIdsChange('pets', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onTableChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onTableChange('pets', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onTableIdsChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onTableIdsChange(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onTablesChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onTablesChange(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onValueChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onValueChange('key', () => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setValue('key', 'value')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onValueIdsChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onValueIdsChange(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setValue('key', 'value')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onValuesChange', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onValuesChange(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setValue('key', 'value')

  expect(counter).toBe(1)
})

test('[default-store/store/events] onWillFinishTransaction', () => {
  const store = createStore()
  let counter = 0

  const Component = defineComponent({
    setup() {
      onWillFinishTransaction(() => {
        counter++
      })

      return () => h('div')
    },
  })

  mount(providerWrapper(Component, store))
  expect(counter).toBe(0)

  store.setCell('pets', 'fido', 'species', 'dog')

  expect(counter).toBe(1)
})
