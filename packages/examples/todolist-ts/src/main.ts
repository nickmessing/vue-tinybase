import 'todomvc-app-css/index.css'
import { createApp } from 'vue'
import { createTinybaseVue } from 'vue-tinybase'

import App from '@/App.vue'
import { router } from '@/router'
import { store } from '@/store'

const app = createApp(App)

app.use(router)
app.use(createTinybaseVue(store))

app.mount('#app')
