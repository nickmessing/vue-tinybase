import 'todomvc-app-css/index.css'
import { createApp, h } from 'vue'
import { provideStore } from 'vue-tinybase'

import App from '@/App.vue'
import { router } from '@/router'
import { store } from '@/store'

const app = createApp({
  setup() {
    provideStore(store)
  },
  render: () => h(App),
})

app.use(router)

app.mount('#app')
