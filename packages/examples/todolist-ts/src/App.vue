<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="todoapp">
    <h1>todos</h1>
    <RouterView />
  </section>
  <footer class="info">
    <p>Double click to edit.</p>
    <p>Created with 💛 by <a href="https://github.com/nickmessing">Nick Messing</a></p>
    <p>
      Syncs with <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</a>,
      persistent in your browser.
    </p>
  </footer>
</template>
