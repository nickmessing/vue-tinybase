<script setup lang="ts">
import SingleTodo from '@/components/todos/SingleTodo.vue'

const props = withDefaults(
  defineProps<{
    rowIds: string[]
    isToggleAllHidden?: boolean
  }>(),
  {
    isToggleAllHidden: false,
  },
)
const allCompleted = defineModel<boolean>('allCompleted')
</script>

<template>
  <section v-if="props.rowIds.length > 0" class="main">
    <input v-if="!props.isToggleAllHidden" id="toggle-all" v-model="allCompleted" class="toggle-all" type="checkbox" />
    <label v-if="!props.isToggleAllHidden" for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <SingleTodo v-for="rowId in props.rowIds" :key="rowId" :rowId="rowId" />
    </ul>
  </section>
</template>
