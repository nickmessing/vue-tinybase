import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'

import { providerWrapper, store } from '../../test-utils/store.js'

import { cellRef, rowRef, tableRef, tablesRef, valueRef, valuesRef } from './references.js'

test('[default-store/store/references] cellRef', async () => {
  const Component = defineComponent({
    setup() {
      const value = cellRef('projects', 'p1', 'name')

      return () =>
        h('div', null, [
          h(
            'button',
            {
              id: 'display-toggle',
              onClick: () => {
                value.value = value.value === 'Project Alpha' ? 'Project Beta' : 'Project Alpha'
              },
            },
            'Toggle Value',
          ),
          h('p', null, value.value),
        ])
    },
  })

  const wrapper = mount(providerWrapper(Component))

  expect(wrapper.find('p').text()).toBe('Project Alpha')

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe('Project Beta')
  expect(store.getCell('projects', 'p1', 'name')).toBe('Project Beta')

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe('Project Alpha')
  expect(store.getCell('projects', 'p1', 'name')).toBe('Project Alpha')
})

test('[default-store/store/references] rowRef', async () => {
  const Component = defineComponent({
    setup() {
      const value = rowRef('projects', 'p1')

      return () =>
        h('div', null, [
          h(
            'button',
            {
              id: 'display-toggle',
              onClick: () => {
                value.value = {
                  ...value.value,
                  name: value.value.name === 'Project Alpha' ? 'Project Beta' : 'Project Alpha',
                }
              },
            },
            'Toggle Value',
          ),
          h('p', null, JSON.stringify(value.value)),
        ])
    },
  })

  const wrapper = mount(providerWrapper(Component))

  expect(wrapper.find('p').text()).toBe(
    '{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"}',
  )

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"id":"p1","name":"Project Beta","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"}',
  )
  expect(store.getRow('projects', 'p1')).toEqual({
    id: 'p1',
    name: 'Project Beta',
    description: 'First project description',
    startDate: '2023-01-01',
    endDate: '2023-06-01',
  })

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"}',
  )
  expect(store.getRow('projects', 'p1')).toEqual({
    id: 'p1',
    name: 'Project Alpha',
    description: 'First project description',
    startDate: '2023-01-01',
    endDate: '2023-06-01',
  })
})

test('[default-store/store/references] tableRef', async () => {
  const Component = defineComponent({
    setup() {
      const value = tableRef('projects')

      return () =>
        h('div', null, [
          h(
            'button',
            {
              id: 'display-toggle',
              onClick: () => {
                value.value = {
                  ...value.value,
                  p1: {
                    ...value.value.p1,
                    name: value.value.p1.name === 'Project Alpha' ? 'Project Beta' : 'Project Alpha',
                  },
                }
              },
            },
            'Toggle Value',
          ),
          h('p', null, JSON.stringify(value.value)),
        ])
    },
  })

  const wrapper = mount(providerWrapper(Component))

  expect(wrapper.find('p').text()).toBe(
    '{"p1":{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}}',
  )

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"p1":{"id":"p1","name":"Project Beta","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}}',
  )
  expect(store.getTable('projects')).toEqual({
    p1: {
      id: 'p1',
      name: 'Project Beta',
      description: 'First project description',
      startDate: '2023-01-01',
      endDate: '2023-06-01',
    },
    p2: {
      id: 'p2',
      name: 'Project Beta',
      description: 'Second project description',
      startDate: '2023-02-01',
      endDate: '2023-07-01',
    },
    p3: {
      id: 'p3',
      name: 'Project Gamma',
      description: 'Third project description',
      startDate: '2023-03-01',
      endDate: '2023-08-01',
    },
  })

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"p1":{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}}',
  )
  expect(store.getTable('projects')).toEqual({
    p1: {
      id: 'p1',
      name: 'Project Alpha',
      description: 'First project description',
      startDate: '2023-01-01',
      endDate: '2023-06-01',
    },
    p2: {
      id: 'p2',
      name: 'Project Beta',
      description: 'Second project description',
      startDate: '2023-02-01',
      endDate: '2023-07-01',
    },
    p3: {
      id: 'p3',
      name: 'Project Gamma',
      description: 'Third project description',
      startDate: '2023-03-01',
      endDate: '2023-08-01',
    },
  })
})

test('[default-store/store/references] tablesRef', async () => {
  const Component = defineComponent({
    setup() {
      const value = tablesRef()

      return () =>
        h('div', null, [
          h(
            'button',
            {
              id: 'display-toggle',
              onClick: () => {
                value.value = {
                  ...value.value,
                  projects: {
                    ...value.value.projects,
                    p1: {
                      ...value.value.projects!.p1,
                      name: value.value.projects!.p1.name === 'Project Alpha' ? 'Project Beta' : 'Project Alpha',
                    },
                  },
                }
              },
            },
            'Toggle Value',
          ),
          h('p', null, JSON.stringify(value.value)),
        ])
    },
  })

  const wrapper = mount(providerWrapper(Component))

  expect(wrapper.find('p').text()).toBe(
    '{"projects":{"p1":{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}},"tasks":{"t1":{"id":"t1","projectId":"p1","title":"Task 1","description":"Description for task 1","status":"To Do","dueDate":"2023-01-10"},"t2":{"id":"t2","projectId":"p1","title":"Task 2","description":"Description for task 2","status":"In Progress","dueDate":"2023-01-15"},"t3":{"id":"t3","projectId":"p1","title":"Task 3","description":"Description for task 3","status":"Done","dueDate":"2023-01-20"},"t4":{"id":"t4","projectId":"p2","title":"Task 4","description":"Description for task 4","status":"To Do","dueDate":"2023-02-10"},"t5":{"id":"t5","projectId":"p2","title":"Task 5","description":"Description for task 5","status":"In Progress","dueDate":"2023-02-15"},"t6":{"id":"t6","projectId":"p2","title":"Task 6","description":"Description for task 6","status":"Done","dueDate":"2023-02-20"},"t7":{"id":"t7","projectId":"p3","title":"Task 7","description":"Description for task 7","status":"To Do","dueDate":"2023-03-10"},"t8":{"id":"t8","projectId":"p3","title":"Task 8","description":"Description for task 8","status":"In Progress","dueDate":"2023-03-15"},"t9":{"id":"t9","projectId":"p3","title":"Task 9","description":"Description for task 9"},"t10":{"id":"t10","projectId":"p3","title":"Task 10","description":"Description for task 10","status":"To Do","dueDate":"2023-03-25"}},"users":{"u1":{"id":"u1","name":"Alice Johnson","email":"alice@example.com","role":"Admin"},"u2":{"id":"u2","name":"Bob Smith","email":"bob@example.com","role":"Manager"},"u3":{"id":"u3","name":"Charlie Brown","email":"charlie@example.com","role":"Developer"}}}',
  )

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"projects":{"p1":{"id":"p1","name":"Project Beta","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}},"tasks":{"t1":{"id":"t1","projectId":"p1","title":"Task 1","description":"Description for task 1","status":"To Do","dueDate":"2023-01-10"},"t2":{"id":"t2","projectId":"p1","title":"Task 2","description":"Description for task 2","status":"In Progress","dueDate":"2023-01-15"},"t3":{"id":"t3","projectId":"p1","title":"Task 3","description":"Description for task 3","status":"Done","dueDate":"2023-01-20"},"t4":{"id":"t4","projectId":"p2","title":"Task 4","description":"Description for task 4","status":"To Do","dueDate":"2023-02-10"},"t5":{"id":"t5","projectId":"p2","title":"Task 5","description":"Description for task 5","status":"In Progress","dueDate":"2023-02-15"},"t6":{"id":"t6","projectId":"p2","title":"Task 6","description":"Description for task 6","status":"Done","dueDate":"2023-02-20"},"t7":{"id":"t7","projectId":"p3","title":"Task 7","description":"Description for task 7","status":"To Do","dueDate":"2023-03-10"},"t8":{"id":"t8","projectId":"p3","title":"Task 8","description":"Description for task 8","status":"In Progress","dueDate":"2023-03-15"},"t9":{"id":"t9","projectId":"p3","title":"Task 9","description":"Description for task 9"},"t10":{"id":"t10","projectId":"p3","title":"Task 10","description":"Description for task 10","status":"To Do","dueDate":"2023-03-25"}},"users":{"u1":{"id":"u1","name":"Alice Johnson","email":"alice@example.com","role":"Admin"},"u2":{"id":"u2","name":"Bob Smith","email":"bob@example.com","role":"Manager"},"u3":{"id":"u3","name":"Charlie Brown","email":"charlie@example.com","role":"Developer"}}}',
  )

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"projects":{"p1":{"id":"p1","name":"Project Alpha","description":"First project description","startDate":"2023-01-01","endDate":"2023-06-01"},"p2":{"id":"p2","name":"Project Beta","description":"Second project description","startDate":"2023-02-01","endDate":"2023-07-01"},"p3":{"id":"p3","name":"Project Gamma","description":"Third project description","startDate":"2023-03-01","endDate":"2023-08-01"}},"tasks":{"t1":{"id":"t1","projectId":"p1","title":"Task 1","description":"Description for task 1","status":"To Do","dueDate":"2023-01-10"},"t2":{"id":"t2","projectId":"p1","title":"Task 2","description":"Description for task 2","status":"In Progress","dueDate":"2023-01-15"},"t3":{"id":"t3","projectId":"p1","title":"Task 3","description":"Description for task 3","status":"Done","dueDate":"2023-01-20"},"t4":{"id":"t4","projectId":"p2","title":"Task 4","description":"Description for task 4","status":"To Do","dueDate":"2023-02-10"},"t5":{"id":"t5","projectId":"p2","title":"Task 5","description":"Description for task 5","status":"In Progress","dueDate":"2023-02-15"},"t6":{"id":"t6","projectId":"p2","title":"Task 6","description":"Description for task 6","status":"Done","dueDate":"2023-02-20"},"t7":{"id":"t7","projectId":"p3","title":"Task 7","description":"Description for task 7","status":"To Do","dueDate":"2023-03-10"},"t8":{"id":"t8","projectId":"p3","title":"Task 8","description":"Description for task 8","status":"In Progress","dueDate":"2023-03-15"},"t9":{"id":"t9","projectId":"p3","title":"Task 9","description":"Description for task 9"},"t10":{"id":"t10","projectId":"p3","title":"Task 10","description":"Description for task 10","status":"To Do","dueDate":"2023-03-25"}},"users":{"u1":{"id":"u1","name":"Alice Johnson","email":"alice@example.com","role":"Admin"},"u2":{"id":"u2","name":"Bob Smith","email":"bob@example.com","role":"Manager"},"u3":{"id":"u3","name":"Charlie Brown","email":"charlie@example.com","role":"Developer"}}}',
  )
})

test('[default-store/store/references] valueRef', async () => {
  const Component = defineComponent({
    setup() {
      const value = valueRef('theme')

      return () =>
        h('div', null, [
          h(
            'button',
            {
              id: 'display-toggle',
              onClick: () => {
                value.value = value.value === 'light' ? 'dark' : 'light'
              },
            },
            'Toggle Value',
          ),
          h('p', null, value.value),
        ])
    },
  })

  const wrapper = mount(providerWrapper(Component))

  expect(wrapper.find('p').text()).toBe('light')

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe('dark')
  expect(store.getValue('theme')).toBe('dark')

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe('light')
  expect(store.getValue('theme')).toBe('light')
})

test('[default-store/store/references] valuesRef', async () => {
  const Component = defineComponent({
    setup() {
      const value = valuesRef()

      return () =>
        h('div', null, [
          h(
            'button',
            {
              id: 'display-toggle',
              onClick: () => {
                value.value = {
                  ...value.value,
                  theme: value.value.theme === 'light' ? 'dark' : 'light',
                }
              },
            },
            'Toggle Value',
          ),
          h('p', null, JSON.stringify(value.value)),
        ])
    },
  })

  const wrapper = mount(providerWrapper(Component))

  expect(wrapper.find('p').text()).toBe(
    '{"theme":"light","notificationsEnabled":true,"currentUserId":"u1","isAuthenticated":true,"lastSyncDate":"2023-01-01"}',
  )

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"theme":"dark","notificationsEnabled":true,"currentUserId":"u1","isAuthenticated":true,"lastSyncDate":"2023-01-01"}',
  )
  expect(store.getValues()).toEqual({
    theme: 'dark',
    notificationsEnabled: true,
    currentUserId: 'u1',
    isAuthenticated: true,
    lastSyncDate: '2023-01-01',
  })

  await wrapper.find('#display-toggle').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe(
    '{"theme":"light","notificationsEnabled":true,"currentUserId":"u1","isAuthenticated":true,"lastSyncDate":"2023-01-01"}',
  )
  expect(store.getValues()).toEqual({
    theme: 'light',
    notificationsEnabled: true,
    currentUserId: 'u1',
    isAuthenticated: true,
    lastSyncDate: '2023-01-01',
  })
})
