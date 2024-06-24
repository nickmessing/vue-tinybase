<script setup lang="ts">
import { ref, watch } from 'vue'

const isDefaultStoreSelected = ref(localStorage.getItem('isDefaultStoreSelected') === 'true' || false)

watch(isDefaultStoreSelected, () => {
  localStorage.setItem('isDefaultStoreSelected', isDefaultStoreSelected.value.toString())
  if (isDefaultStoreSelected.value) {
    document.body.classList.add('default-store')
    document.body.classList.remove('custom-store')
  } else {
    document.body.classList.remove('default-store')
    document.body.classList.add('custom-store')
  }
})
</script>

<template>
  <input v-model="isDefaultStoreSelected" type="checkbox" id="default-store-switch" />
</template>
