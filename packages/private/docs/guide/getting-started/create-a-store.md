# Create a store

TinyBase is a powerful and flexible state management library that provides a robust solution for managing your application's data. To get started with TinyBase, you'll need to create a store, which is where all your data will reside.

Feel free to check [the official TinyBase documentation](https://tinybase.org/guides/the-basics/creating-a-store/) for more detailed information and examples.

## Add `tinybase` package to your project

First, you need to install the `tinybase` package. You can do this using npm with the following command:

```bash
npm install --save tinybase
```

This will add TinyBase to your project’s dependencies, allowing you to import and use it in your code.

## Create a store

Once you have installed the TinyBase package, you can create a store. The store is a central place where you can keep and manage your application’s state.

Create a new JavaScript file, for example `tinybase.js`, and add the following code:

```javascript
import { createStore } from 'tinybase'

// Create a new store instance
export const store = createStore()
```

This code imports the createStore function from TinyBase and uses it to create a new store instance. The store is then exported so that it can be imported and used in other parts of your application.

With your store set up, the next step is to [connect it to your Vue.js application](/guide/getting-started/connect-to-vuejs-app). This allows you to use TinyBase’s state management features within your Vue components.
