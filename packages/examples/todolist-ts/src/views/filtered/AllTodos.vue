<script setup lang="ts">
import { computed } from 'vue'
import { useStore, useTable } from 'vue-tinybase/typed'

import TodosList from '@/components/todos/TodosList.vue'

const table = useTable('todos')
const rowIds = computed(() => Object.keys(table.value))

const store = useStore()
const allCompleted = computed({
  get: () => rowIds.value.length > 0 && rowIds.value.every(rowId => table.value[rowId].completed),
  set: (value: boolean) => {
    for (const rowId of rowIds.value) {
      if (table.value[rowId].completed !== value) {
        store.setCell('todos', rowId, 'completed', value)
      }
    }
  },
})
</script>

<template>
  <TodosList v-model:allCompleted="allCompleted" :rowIds="rowIds" />
</template>
