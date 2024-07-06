import { createStore } from 'tinybase/with-schemas'

export const store = createStore()
  .setTablesSchema({
    projects: {
      id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      startDate: { type: 'string' },
      endDate: { type: 'string' },
    },
    tasks: {
      id: { type: 'string' },
      projectId: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string' },
      dueDate: { type: 'string' },
    },
    users: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' },
    },
  })
  .setValuesSchema({
    currentUserId: { type: 'string' },
    isAuthenticated: { type: 'boolean' },
    theme: { type: 'string', default: 'light' },
    notificationsEnabled: { type: 'boolean', default: true },
    lastSyncDate: { type: 'string' },
  })
  .setTables({
    projects: {
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
    },
    tasks: {
      t1: {
        id: 't1',
        projectId: 'p1',
        title: 'Task 1',
        description: 'Description for task 1',
        status: 'To Do',
        dueDate: '2023-01-10',
      },
      t2: {
        id: 't2',
        projectId: 'p1',
        title: 'Task 2',
        description: 'Description for task 2',
        status: 'In Progress',
        dueDate: '2023-01-15',
      },
      t3: {
        id: 't3',
        projectId: 'p1',
        title: 'Task 3',
        description: 'Description for task 3',
        status: 'Done',
        dueDate: '2023-01-20',
      },
      t4: {
        id: 't4',
        projectId: 'p2',
        title: 'Task 4',
        description: 'Description for task 4',
        status: 'To Do',
        dueDate: '2023-02-10',
      },
      t5: {
        id: 't5',
        projectId: 'p2',
        title: 'Task 5',
        description: 'Description for task 5',
        status: 'In Progress',
        dueDate: '2023-02-15',
      },
      t6: {
        id: 't6',
        projectId: 'p2',
        title: 'Task 6',
        description: 'Description for task 6',
        status: 'Done',
        dueDate: '2023-02-20',
      },
      t7: {
        id: 't7',
        projectId: 'p3',
        title: 'Task 7',
        description: 'Description for task 7',
        status: 'To Do',
        dueDate: '2023-03-10',
      },
      t8: {
        id: 't8',
        projectId: 'p3',
        title: 'Task 8',
        description: 'Description for task 8',
        status: 'In Progress',
        dueDate: '2023-03-15',
      },
      t9: {
        id: 't9',
        projectId: 'p3',
        title: 'Task 9',
        description: 'Description for task 9',
      },
      t10: {
        id: 't10',
        projectId: 'p3',
        title: 'Task 10',
        description: 'Description for task 10',
        status: 'To Do',
        dueDate: '2023-03-25',
      },
    },
    users: {
      u1: {
        id: 'u1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Admin',
      },
      u2: {
        id: 'u2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'Manager',
      },
      u3: {
        id: 'u3',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        role: 'Developer',
      },
    },
  })
  .setValues({
    currentUserId: 'u1',
    isAuthenticated: true,
    theme: 'light',
    notificationsEnabled: true,
    lastSyncDate: '2023-01-01',
  })

export type Store = typeof store

declare module '../types.js' {
  export interface VueTinybaseContext {
    store: Store
  }
}
