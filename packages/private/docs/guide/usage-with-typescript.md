# Usage with TypeScript

TinyBase provides excellent support for TypeScript, allowing you to define and enforce types for your data. We highly recommend using "Schema-based" typing because it is best supported and provides a robust way to manage your application's state.

For more information on Schema-based typing, please refer to the [official TinyBase documentation](https://tinybase.org/guides/the-basics/tinybase-and-typescript/#2-schema-based-typing).

## Connecting Defined Schema to Vue-TinyBase Composables

The following code snippet demonstrates how to define a schema for your store and connect it to all composables imported from `vue-tinybase`:

```typescript
import { createStore } from 'tinybase/with-schemas'

// Create a store with schema-based typing
export const store = createStore()
  .setTablesSchema({
    // Define the schema for the 'todos' table
    todos: {
      text: { type: 'string' },
      completed: { type: 'boolean', default: false },
    },
  })
  .setValuesSchema({
    // Define the schema for the store's values
    val1: { type: 'string' },
    val2: { type: 'number', default: 0 },
    val3: { type: 'boolean', default: false },
  })

// Export the store type
export type Store = typeof store

// Extend the Vue-Tinybase context with the store type
declare module 'vue-tinybase' {
  export interface VueTinybaseContext {
    store: Store
  }
}
```
