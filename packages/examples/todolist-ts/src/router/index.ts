import { createRouter, createWebHistory } from 'vue-router'

import ActiveTodos from '@/views/filtered/ActiveTodos.vue'
import AllTodos from '@/views/filtered/AllTodos.vue'
import CompletedTodos from '@/views/filtered/CompletedTodos.vue'
import Todos from '@/views/Todos.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: Todos,
      children: [
        {
          path: '',
          name: 'todos-all',
          component: AllTodos,
        },
        {
          path: 'active',
          name: 'todos-active',
          component: ActiveTodos,
        },
        {
          path: 'completed',
          name: 'todos-completed',
          component: CompletedTodos,
        },
      ],
    },
  ],
})
