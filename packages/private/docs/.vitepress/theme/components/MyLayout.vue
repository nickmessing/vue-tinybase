<script setup lang="ts">
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VPSwitchStoreStyle from './VPSwitchStoreStyle.vue'
import { computed } from 'vue'

const { Layout } = DefaultTheme

const route = useRoute()

const isApiPage = computed(() => route.path.startsWith('/api'))
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <ClientOnly v-if="isApiPage">
        <VPSwitchStoreStyle />
      </ClientOnly>
    </template>
  </Layout>
</template>
