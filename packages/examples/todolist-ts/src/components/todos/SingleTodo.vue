<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useCell, useStore } from 'vue-tinybase/typed'

const props = defineProps<{
  rowId: string
}>()

const isCompleted = useCell('todos', () => props.rowId, 'completed')

const todoText = useCell('todos', () => props.rowId, 'text')
const inputValue = ref('')
const inputReference = ref<HTMLInputElement>()
const isEditing = ref(false)

async function enterEditingMode() {
  isEditing.value = true
  inputValue.value = todoText.value
  await nextTick()
  inputReference.value?.focus()
}
function exitEditingMode(save = false) {
  isEditing.value = false
  if (save) {
    todoText.value = inputValue.value
  }
}

const store = useStore()
function removeTodo() {
  store.delRow('todos', props.rowId)
}
</script>

<template>
  <li
    :class="{
      completed: isCompleted,
      editing: isEditing,
      view: !isEditing && !isCompleted,
    }"
    @dblclick="enterEditingMode"
  >
    <div class="view">
      <input v-model="isCompleted" class="toggle" type="checkbox" />
      <label>{{ todoText }}</label>
      <button class="destroy" @click="removeTodo" />
    </div>
    <input
      ref="inputReference"
      v-model="inputValue"
      class="edit"
      @blur="exitEditingMode(false)"
      @keydown.enter="exitEditingMode(true)"
      @keydown.esc="exitEditingMode(false)"
    />
  </li>
</template>
