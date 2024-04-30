## Vue-TinyBase

**Warning**: This is a work-in-progress. Avoid using in production.

Please open github issues for any feature requests or questions.

**Note**: For all props marked as "reactive" - they accept values, functions that return values or references (including computed references)

- [Setup](#setup)
- [Usage](#usage)
  - [Composables](#composables)
    - [`useStore`](#usestore)
    - [`useValues`](#usevalues)
    - [`useValue` (writable)](#usevalue)
    - [`useTables`](#usetables)
    - [`useTable`](#usetable)
    - [`useRow`](#userow)
    - [`useCell` (writable)](#usecell)
  - [Usage with TypeScript](#usage-with-typescript)

# Setup

Make sure you have a [TinyBase](https://tinybase.org/) store set-up.

## 1. Install vue-tinybase

```shell
npm install --save vue-tinybase
```

## 2. Connect TinyBase Store to Vue

This will be "default" store used by composables.
If this store is not passed - you have to manually pass store as the last argument to every composable.

```js
const app = createApp(App)

// store should be imported from where it is created
app.use(createTinybaseVue(store))
```

# Usage

## Composables

### `useStore`

Returns the default store used in the ["Connect TinyBase Store to Vue"](#2-connect-tinybase-store-to-vue) step.

**Note**: This is not a ref, this comes a the store itself.

```typescript
const store = useStore()

function setAsCompleted() {
  store.setCell('todos', rowId, 'completed', true)
}
```

### `useValues`

Returns a **readonly** computed reference to all the values from a store.

#### Params:

- `store?: Store`

```vue
<script setup>
import { useValues } from 'vue-tinybase'

const values = useValues()
</script>
<template>
  <h2>Store is {{ values.open ? 'open' : 'closed' }}</h2>
</template>
```

### `useValue`

Returns a **writable** computed reference to a value from a store.

#### Params:

- `valueId: string` (reactive)
- `store?: Store`

```vue
<script setup>
import { useValue } from 'vue-tinybase'

const isOpen = useValue('open') // this is a boolean
</script>
<template>
  <button @click="isOpen = !isOpen">{{ isOpen ? 'Close' : 'Open' }}</button>
</template>
```

### `useTables`

Returns a **readonly** computed reference to all the tables from a store.

#### Params:

- `store?: Store`

```vue
<script setup>
import { useTables } from 'vue-tinybase'

const tables = useTables()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Species</th>
        <th>Count</th>
        <th>Sold</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowId) in tables.pets" :key="rowId">
        <td>{{ row.species }}</td>
        <td>{{ row.count }}</td>
        <td>{{ row.sold }}</td>
      </tr>
    </tbody>
  </table>
</template>
```

### `useTable`

Returns a **readonly** computed reference to a table from a store.

#### Params:

- `tableId: string` (reactive)
- `store?: Store`

```vue
<script setup>
import { useTable } from 'vue-tinybase'

const pets = useTable('pets')
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Species</th>
        <th>Count</th>
        <th>Sold</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in pets" :key="index">
        <td>{{ row.species }}</td>
        <td>{{ row.count }}</td>
        <td>{{ row.sold }}</td>
      </tr>
    </tbody>
  </table>
</template>
```

### `useRow`

Returns a **readonly** computed reference to a row from a table.

#### Params:

- `tableId: string` (reactive)
- `rowId: string` (reactive)
- `store?: Store`

```vue
<script setup>
import { useRow } from 'vue-tinybase'

const props = defineProps(['rowId'])

const pet = useRow('pets', () => props.rowId)
</script>

<template>
  <tr>
    <td>{{ pet.species }}</td>
    <td>{{ pet.count }}</td>
    <td>{{ pet.sold }}</td>
  </tr>
</template>
```

### `useCell`

Returns a **writable** computed reference to a cell from a store.

#### Params:

- `tableId: string` (reactive)
- `rowId: string` (reactive)
- `cellId: string` (reactive)
- `store?: Store`

```vue
<script setup>
import { useRow } from 'vue-tinybase'

const props = defineProps(['rowId'])

const isCompleted = useCell('todos', () => props.rowId, 'completed')
</script>

<template>
  <button @click="isCompleted = !isCompleted">
    {{ isCompleted ? 'Mark as completed' : 'Unmark as completed' }}
  </button>
</template>
```

## Usage with TypeScript

Usage with typescript is only well-supported for a single store.

Check `packages/examples/todolist-ts` for a working example.

### 1. Expose type definitions

Expose your store type definitions to be imported elsewere. Here's a simple example: (also available in `packages/examples/todolist-ts`).

```typescript
import { createStore } from 'tinybase/with-schemas'

export const store = createStore().setTablesSchema({
  todos: {
    text: { type: 'string' },
    completed: { type: 'boolean', default: false },
  },
})

export type Store = typeof store // this line exposes the type
```

### 2. Declare a typed module

Add to your global `.d.ts` a definition based on your store types.

```typescript
declare module 'vue-tinybase/typed' {
  import type { Store } from '@/store' // import from your type definition
  import type {
    TypedUseCellFunction,
    TypedUseRowFunction,
    TypedUseStoreFunction,
    TypedUseTableFunction,
    TypedUseTablesFunction,
    TypedUseValueFunction,
    TypedUseValuesFunction,
  } from 'vue-tinybase'

  export const useStore: TypedUseStoreFunction<Store>
  export const useValues: TypedUseValuesFunction<Store>
  export const useValue: TypedUseValueFunction<Store>
  export const useTables: TypedUseTablesFunction<Store>
  export const useTable: TypedUseTableFunction<Store>
  export const useRow: TypedUseRowFunction<Store>
  export const useCell: TypedUseCellFunction<Store>
}
```

### 3. Add alias to your bundler

Alias `vue-tinybase/typed` to be resolved to `vue-tinybase` in your bundler.

Example with vite:

```typescript
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-tinybase/typed': 'vue-tinybase',
    },
  },
})
```

### 4. Replace your imports

Import all composables from `vue-tinybase/typed` instead of `vue-tinybase`
