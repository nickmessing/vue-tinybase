<script setup lang="ts">
import { RouterView } from 'vue-router'

import NewTodoInput from '@/components/todos/NewTodoInput.vue'
import TodosFooter from '@/components/todos/TodosFooter.vue'
</script>

<template>
  <header class="header">
    <NewTodoInput />
  </header>
  <RouterView />
  <TodosFooter />
</template>
