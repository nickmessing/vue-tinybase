# Connect the Store to Your Vue.js App

With your TinyBase store set up, the next step is to connect it to your Vue.js application. This integration allows you to leverage TinyBase’s state management capabilities within your Vue components.

For more details on context, you can refer to the [context](/api/store/context) section of the API.

## Add `vue-tinybase` package to your project

First, you need to install the `vue-tinybase` package. You can do this using npm with the following command:

```bash
npm install --save vue-tinybase
```

This will add TinyBase to your project’s dependencies, allowing you to import and use it in your code.

## Provide the Store to Your Vue App

To provide the TinyBase store to your Vue.js app, you need to use the `provideStore` function from `vue-tinybase`. This will make the store available throughout your Vue component tree.

Here's the simplest example to get you started:

```js
import { createApp, h } from 'vue'
import { provideStore } from 'vue-tinybase'

import { store } from './tinybase'
import App from './App.vue'

const app = createApp({
  setup() {
    provideStore(store)
  },
  render: () => h(App),
})

app.mount('#app')
```

In this example, we create a Vue app and use the provideStore function in the setup function to provide the TinyBase store. The render function is used to render the main App component.

After providing the store, you can use `vue-tinybase` [event hooks](/api/store/events), [composables](/api/store/composables), and [writable references](/api/store/references) inside all components of your app. This integration enables you to interact with the store’s state and respond to changes efficiently.

There are similar provide-related functions for [checkpoints](/api/checkpoints/context) that you can use to provide these objects to your app or part of the app.
