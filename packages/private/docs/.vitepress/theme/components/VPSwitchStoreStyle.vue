<script lang="ts" setup>
// copy/pasted from https://github.com/vuejs/vitepress/blob/8fef47848bd3418014b06eea1337b1e66e0473c6/src/client/theme-default/components/VPSwitchAppearance.vue
// minor modifications
import { watch, ref } from 'vue'
import VPSwitch from './VPSwitch.vue'

const isDefaultStoreSelected = ref(localStorage.getItem('isDefaultStoreSelected') !== 'false')

watch(
  isDefaultStoreSelected,
  () => {
    localStorage.setItem('isDefaultStoreSelected', isDefaultStoreSelected.value.toString())
    if (isDefaultStoreSelected.value) {
      document.body.classList.add('default-store')
      document.body.classList.remove('custom-store')
    } else {
      document.body.classList.remove('default-store')
      document.body.classList.add('custom-store')
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="store-style-switch-container">
    <h2>Store type</h2>
    <div class="store-style-switch">
      <span class="store-style-default">Default</span>
      <VPSwitch
        class="VPSwitchStoreStyle"
        :aria-checked="isDefaultStoreSelected"
        @click="isDefaultStoreSelected = !isDefaultStoreSelected"
      />
      <span class="store-style-custom">Multiple</span>
    </div>
  </div>
</template>

<style>
.store-style-switch-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
  margin-top: 16px;
  padding: 8px;
  background-color: hsla(0, 0%, 100%, 0.2);
  border-radius: 8px;
}

.store-style-switch-container h2 {
  font-size: 13px;
  font-weight: 700;
}

.store-style-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

body.custom-store .store-style-custom,
body.default-store .store-style-default {
  font-weight: 700;
}

body.custom-store .hide-custom-store,
body.default-store .hide-default-store {
  display: none;
}

.custom-store .VPSwitchStoreStyle .check {
  transform: translateX(18px);
}
</style>
