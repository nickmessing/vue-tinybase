<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore, useTable } from 'vue-tinybase'

const { data: table } = useTable('todos')
const entries = computed(() => Object.entries(table.value))
const activeEntries = computed(() => entries.value.filter(([_, entry]) => !entry.completed))
const completedEntries = computed(() => entries.value.filter(([_, entry]) => entry.completed))

const store = useStore()
function clearCompleted() {
  for (const entry of completedEntries.value) {
    store.delRow('todos', entry[0])
  }
}
</script>

<template>
  <footer v-if="entries.length > 0" class="footer">
    <span class="todo-count">
      <strong>{{ activeEntries.length }}</strong> item{{ activeEntries.length > 0 ? 's' : '' }} left
    </span>
    <ul class="filters">
      <li>
        <RouterLink exactActiveClass="selected" to="/">All</RouterLink>
      </li>
      <li>
        <RouterLink exactActiveClass="selected" to="/active">Active ({{ activeEntries.length }})</RouterLink>
      </li>
      <li>
        <RouterLink exactActiveClass="selected" to="/completed">Completed ({{ completedEntries.length }})</RouterLink>
      </li>
    </ul>
    <button v-if="completedEntries.length > 0" class="clear-completed" @click="clearCompleted">Clear completed</button>
  </footer>
</template>
