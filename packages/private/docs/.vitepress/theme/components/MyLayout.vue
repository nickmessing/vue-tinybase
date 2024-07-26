<script setup lang="ts">
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VPSwitchStoreStyle from './VPSwitchStoreStyle.vue'
import { computed } from 'vue'
import { useBodyClass } from '../composables/useBodyClass.mjs'
import { useLocalStorage } from '@vueuse/core'

const { Layout } = DefaultTheme

const route = useRoute()

const isApiPage = computed(() => route.path.startsWith('/api'))

const isDefaultStore = useLocalStorage('isDefaultStoreSelected', true)
useBodyClass(isDefaultStore, {
  trueClass: 'default-store',
  falseClass: 'custom-store',
})
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <ClientOnly v-if="isApiPage">
        <VPSwitchStoreStyle v-model="isDefaultStore" />
      </ClientOnly>
    </template>
  </Layout>
</template>
