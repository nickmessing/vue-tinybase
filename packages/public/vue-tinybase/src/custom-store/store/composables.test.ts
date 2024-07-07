import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'

import { store } from '../../test-utils/store.js'

import {
  useCell,
  useCellIds,
  useHasCell,
  useHasRow,
  useHasTable,
  useHasTableCell,
  useHasTables,
  useHasValue,
  useHasValues,
  useRow,
  useRowCount,
  useRowIds,
  useSortedRowIds,
  useTable,
  useTableCellIds,
  useTableIds,
  useTables,
  useValue,
  useValueIds,
  useValues,
} from './composables.js'

test('[custom-store/store/composables] useCell', async () => {
  const Component = defineComponent({
    setup() {
      const isValueVisible = ref(false)
      const currentRowId = ref('p1')
      const value = useCell(store, 'projects', currentRowId, 'name')

      return () =>
        h('div', null, [
          h(
            'button',
            {
              id: 'display-toggle',
              onClick: () => {
                isValueVisible.value = !isValueVisible.value
              },
            },
            'Toggle Display',
          ),
          h(
            'button',
            {
              id: 'display-row',
              onClick: () => {
                currentRowId.value = currentRowId.value === 'p1' ? 'p2' : 'p1'
              },
            },
            'Toggle row',
          ),
          h('p', null, isValueVisible.value ? value.value : '-'),
        ])
    },
  })

  const wrapper = mount(Component)

  expect(store.getListenerStats().cell).toBe(0)
  expect(wrapper.find('p').text()).toBe('-')

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(store.getListenerStats().cell).toBe(1)
  expect(wrapper.find('p').text()).toBe('Project Alpha')

  await wrapper.find('#display-row').trigger('click')
  await nextTick()

  expect(store.getListenerStats().cell).toBe(1)
  expect(wrapper.find('p').text()).toBe('Project Beta')
})

test('[custom-store/store/composables] useCellIds', () => {
  const Component = defineComponent({
    setup() {
      const cellIds = useCellIds(store, 'projects', 'p1')

      return () => h('div', null, cellIds.value.join(', '))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('id, name, description, startDate, endDate')
})

test('[custom-store/store/composables] useHasCell', () => {
  const Component = defineComponent({
    setup() {
      const hasCell = useHasCell(store, 'projects', 'p1', 'name')

      return () => h('div', null, hasCell.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('true')
})

test('[custom-store/store/composables] useHasRow', () => {
  const Component = defineComponent({
    setup() {
      const hasRow = useHasRow(store, 'projects', 'p1')

      return () => h('div', null, hasRow.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('true')
})

test('[custom-store/store/composables] useHasTable', () => {
  const Component = defineComponent({
    setup() {
      const hasTable = useHasTable(store, 'projects')

      return () => h('div', null, hasTable.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('true')
})

test('[custom-store/store/composables] useHasTableCell', () => {
  const Component = defineComponent({
    setup() {
      const hasTableCell = useHasTableCell(store, 'projects', 'name')

      return () => h('div', null, hasTableCell.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('true')
})

test('[custom-store/store/composables] useHasTables', () => {
  const Component = defineComponent({
    setup() {
      const hasTables = useHasTables(store)

      return () => h('div', null, hasTables.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('true')
})

test('[custom-store/store/composables] useHasValue', () => {
  const Component = defineComponent({
    setup() {
      const hasValue = useHasValue(store, 'currentUserId')

      return () => h('div', null, hasValue.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('true')
})

test('[custom-store/store/composables] useHasValues', () => {
  const Component = defineComponent({
    setup() {
      const hasValues = useHasValues(store)

      return () => h('div', null, hasValues.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('true')
})

test('[custom-store/store/composables] useRow', () => {
  const Component = defineComponent({
    setup() {
      const row = useRow(store, 'projects', 'p1')

      return () => h('div', null, JSON.stringify(row.value))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe(
    '{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"}',
  )
})

test('[custom-store/store/composables] useRowCount', () => {
  const Component = defineComponent({
    setup() {
      const rowCount = useRowCount(store, 'projects')

      return () => h('div', null, rowCount.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('3')
})

test('[custom-store/store/composables] useRowIds', () => {
  const Component = defineComponent({
    setup() {
      const rowIds = useRowIds(store, 'projects')

      return () => h('div', null, rowIds.value.join(', '))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('p1, p2, p3')
})

test('[custom-store/store/composables] useSortedRowIds', () => {
  const Component = defineComponent({
    setup() {
      const rowIds = useSortedRowIds(store, 'projects', 'name')

      return () => h('div', null, rowIds.value.join(', '))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('p1, p2, p3')
})

test('[custom-store/store/composables] useTable', () => {
  const Component = defineComponent({
    setup() {
      const table = useTable(store, 'projects')

      return () => h('div', null, JSON.stringify(table.value))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe(
    '{"p1":{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}}',
  )
})

test('[custom-store/store/composables] useTableCellIds', () => {
  const Component = defineComponent({
    setup() {
      const cellIds = useTableCellIds(store, 'projects')

      return () => h('div', null, cellIds.value.join(', '))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('id, name, description, startDate, endDate')
})

test('[custom-store/store/composables] useTableIds', () => {
  const Component = defineComponent({
    setup() {
      const tableIds = useTableIds(store)

      return () => h('div', null, tableIds.value.join(', '))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('projects, tasks, users')
})

test('[custom-store/store/composables] useTables', () => {
  const Component = defineComponent({
    setup() {
      const tables = useTables(store)

      return () => h('div', null, JSON.stringify(tables.value))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe(
    '{"projects":{"p1":{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}},"tasks":{"t1":{"id":"t1","projectId":"p1","title":"Task 1","description":"Description for task 1","status":"To Do","dueDate":"2023-01-10"},"t2":{"id":"t2","projectId":"p1","title":"Task 2","description":"Description for task 2","status":"In Progress","dueDate":"2023-01-15"},"t3":{"id":"t3","projectId":"p1","title":"Task 3","description":"Description for task 3","status":"Done","dueDate":"2023-01-20"},"t4":{"id":"t4","projectId":"p2","title":"Task 4","description":"Description for task 4","status":"To Do","dueDate":"2023-02-10"},"t5":{"id":"t5","projectId":"p2","title":"Task 5","description":"Description for task 5","status":"In Progress","dueDate":"2023-02-15"},"t6":{"id":"t6","projectId":"p2","title":"Task 6","description":"Description for task 6","status":"Done","dueDate":"2023-02-20"},"t7":{"id":"t7","projectId":"p3","title":"Task 7","description":"Description for task 7","status":"To Do","dueDate":"2023-03-10"},"t8":{"id":"t8","projectId":"p3","title":"Task 8","description":"Description for task 8","status":"In Progress","dueDate":"2023-03-15"},"t9":{"id":"t9","projectId":"p3","title":"Task 9","description":"Description for task 9"},"t10":{"id":"t10","projectId":"p3","title":"Task 10","description":"Description for task 10","status":"To Do","dueDate":"2023-03-25"}},"users":{"u1":{"id":"u1","name":"Alice Johnson","email":"alice@example.com","role":"Admin"},"u2":{"id":"u2","name":"Bob Smith","email":"bob@example.com","role":"Manager"},"u3":{"id":"u3","name":"Charlie Brown","email":"charlie@example.com","role":"Developer"}}}',
  )
})

test('[custom-store/store/composables] useValue', () => {
  const Component = defineComponent({
    setup() {
      const value = useValue(store, 'currentUserId')

      return () => h('div', null, value.value)
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('u1')
})

test('[custom-store/store/composables] useValueIds', () => {
  const Component = defineComponent({
    setup() {
      const valueIds = useValueIds(store)

      return () => h('div', null, valueIds.value.join(', '))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe('theme, notificationsEnabled, currentUserId, isAuthenticated, lastSyncDate')
})

test('[custom-store/store/composables] useValues', () => {
  const Component = defineComponent({
    setup() {
      const values = useValues(store)

      return () => h('div', null, JSON.stringify(values.value))
    },
  })

  const wrapper = mount(Component)

  expect(wrapper.text()).toBe(
    '{"theme":"light","notificationsEnabled":true,"currentUserId":"u1","isAuthenticated":true,"lastSyncDate":"2023-01-01"}',
  )
})
