<script setup lang="ts">
import { computed } from 'vue'
import { useTable } from 'vue-tinybase'

import TodosList from '@/components/todos/TodosList.vue'

const table = useTable('todos')
const entries = computed(() => Object.entries(table.value))
const completedEntries = computed(() => entries.value.filter(([_, entry]) => entry.completed))
const rowIds = computed(() => completedEntries.value.map(([rowId, _]) => rowId))
</script>

<template>
  <TodosList :rowIds="rowIds" isToggleAllHidden />
</template>
