<script setup>
import DefaultTheme from 'vitepress/theme'
import VPSwitchStoreStyle from './VPSwitchStoreStyle.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <ClientOnly>
        <VPSwitchStoreStyle />
      </ClientOnly>
    </template>
  </Layout>
</template>
