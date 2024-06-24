<script setup lang="ts">
import { ref } from 'vue'
import { injectStore } from 'vue-tinybase'

const store = injectStore()

const newTodoText = ref('')

function createNewTodo() {
  store.addRow('todos', {
    text: newTodoText.value,
    completed: false,
  })
  newTodoText.value = ''
}
</script>

<template>
  <input
    v-model="newTodoText"
    class="new-todo"
    placeholder="What needs to be done?"
    autofocus
    @keydown.enter="createNewTodo"
  />
</template>
