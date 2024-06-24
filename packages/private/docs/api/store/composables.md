# Composables {#composables}

Store's composables.

## useCell {#use-cell}

The `useCell` composable returns a **readonly** reference to an object containing the value of a single [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in a given [Row](https://tinybase.org/api/store/type-aliases/store/row/), in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **writable** alternative to this composable called [`cellRef`](/api/store/references#cell-ref)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).
- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in the [Row](https://tinybase.org/api/store/type-aliases/store/row/).

### Returns

- `ComputedRef<`[`CellOrUndefined`](https://tinybase.org/api/store/type-aliases/store/cellorundefined/)`>`: A **readonly** reference to the value of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useCell, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const cell = useCell(store, 'pets', 'fido', 'color')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: 'brown'

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: 'walnut'
</script>

<template>
  <div>{{ cell }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useCell, injectStore } from 'vue-tinybase'

const store = injectStore()

const cell = useCell('pets', 'fido', 'color')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: 'brown'

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: 'walnut'
</script>

<template>
  <div>{{ cell }}</div>
</template>
```

</div>

## useCellIds {#use-cell-ids}

The `useCellIds` composable returns a **readonly** reference to the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in a given [Row](https://tinybase.org/api/store/type-aliases/store/row/), in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Returns

- `ComputedRef<`[`Ids`](https://tinybase.org/api/common/type-aliases/identity/ids/)`>`: A **readonly** reference to an array of the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in the [Row](https://tinybase.org/api/store/type-aliases/store/row/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useCellIds, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const cellIds = useCellIds(store, 'table1', 'row1')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["color"]

store.setCell('pets', 'fido', 'species', 'dog')
// UI will show: ["color", "species"]
</script>

<template>
  <div>{{ cellIds }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useCellIds, injectStore } from 'vue-tinybase'

const cellIds = useCellIds('table1', 'row1')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["color"]

store.setCell('pets', 'fido', 'species', 'dog')
// UI will show: ["color", "species"]
</script>

<template>
  <div>{{ cellIds }}</div>
</template>
```

</div>

## useHasCell {#use-has-cell}

The `useHasCell` composable returns a **readonly** reference to a boolean indicating whether a given [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) exists in a given [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).
- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in the [Row](https://tinybase.org/api/store/type-aliases/store/row/).

### Returns

- `ComputedRef<boolean>`: A **readonly** reference to a boolean indicating whether a [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) with that [Id](https://tinybase.org/api/common/type-aliases/identity/id/) exists in that [Row](https://tinybase.org/api/store/type-aliases/store/row/) in that [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useHasCell, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const hasCell = useHasCell(store, 'pets', 'fido', 'legs')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: false

store.setCell('pets', 'fido', 'legs', 4)
// UI will show: true
</script>

<template>
  <div>{{ hasCell }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useHasCell, injectStore } from 'vue-tinybase'

const store = injectStore()

const hasCell = useHasCell('pets', 'fido', 'legs')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: false

store.setCell('pets', 'fido', 'legs', 4)
// UI will show: true
</script>

<template>
  <div>{{ hasCell }}</div>
</template>
```

</div>

## useHasRow {#use-has-row}

The `useHasRow` composable returns a **readonly** reference to a boolean indicating whether a given [Row](https://tinybase.org/api/store/type-aliases/store/row/) exists in the [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Row](https://tinybase.org/api/store/type-aliases/store/row/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Returns

- `ComputedRef<`[`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)`>`: A **readonly** reference to a boolean indicating whether the [Row](https://tinybase.org/api/store/type-aliases/store/row/) exists.

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useHasRow, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const hasRow = useHasRow(store, 'pets', 'felix')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: false

store.setCell('pets', 'felix', 'color', 'black')
// UI will show: true
</script>

<template>
  <div>{{ hasRow }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useHasRow, injectStore } from 'vue-tinybase'

const store = injectStore()

const hasRow = useHasRow('pets', 'felix')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: false

store.setCell('pets', 'felix', 'color', 'black')
// UI will show: true
</script>

<template>
  <div>{{ hasRow }}</div>
</template>
```

</div>

## useHasTable {#use-has-table}

The `useHasTable` composable returns a **readonly** reference to a boolean indicating whether a given [Table](https://tinybase.org/api/store/type-aliases/store/table/) exists in the [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Table](https://tinybase.org/api/store/type-aliases/store/table/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `ComputedRef<boolean>`: A **readonly** reference to a boolean indicating whether the [Table](https://tinybase.org/api/store/type-aliases/store/table/) exists.

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useHasTable, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const hasTable = useHasTable(store, 'pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: true

store.delTable('pets')
// UI will show: false
</script>

<template>
  <div>{{ hasTable }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useHasTable, injectStore } from 'vue-tinybase'

const store = injectStore()

const hasTable = useHasTable('pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: true

store.delTable('pets')
// UI will show: false
</script>

<template>
  <div>{{ hasTable }}</div>
</template>
```

</div>

## useHasTableCell {#use-has-table-cell}

The `useHasTableCell` composable returns a **readonly** reference to a boolean indicating whether a given [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) exists anywhere in a [Table](https://tinybase.org/api/store/type-aliases/store/table/), not just in a specific [Row](https://tinybase.org/api/store/type-aliases/store/row/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Table](https://tinybase.org/api/store/type-aliases/store/table/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Returns

- `ComputedRef<boolean>`: A **readonly** reference to a boolean indicating whether the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) exists in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useHasTableCell, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const hasTableCell = useHasTableCell(store, 'pets', 'legs')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: false

store.setRow('pets', 'felix', { color: 'black', legs: 4 })
// UI will show: true
</script>

<template>
  <div>{{ hasTableCell }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useHasTableCell, injectStore } from 'vue-tinybase'

const store = injectStore()

const hasTableCell = useHasTableCell('pets', 'legs')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: false

store.setRow('pets', 'felix', { color: 'black', legs: 4 })
// UI will show: true
</script>

<template>
  <div>{{ hasTableCell }}</div>
</template>
```

</div>

## useHasTables {#use-has-tables}

The `useHasTables` composable returns a **readonly** reference to a boolean indicating whether any [Table](https://tinybase.org/api/store/type-aliases/store/table/) objects exist in the [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

<div class="hide-default-store">

### Parameters

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `ComputedRef<boolean>`: A **readonly** reference to a boolean indicating whether any [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) exist.

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useHasTables, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const hasTables = useHasTables(store)

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: true

store.delTable('pets')
// UI will show: false
</script>

<template>
  <div>{{ hasTables }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useHasTables, injectStore } from 'vue-tinybase'

const store = injectStore()

const hasTables = useHasTables()

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: true

store.delTable('pets')
// UI will show: false
</script>

<template>
  <div>{{ hasTables }}</div>
</template>
```

</div>

## useHasValue {#use-has-value}

The `useHasValue` composable returns a **readonly** reference to a boolean indicating whether a given [Value](https://tinybase.org/api/store/type-aliases/store/value/) exists in the [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Value](https://tinybase.org/api/store/type-aliases/store/value/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `valueId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Value](https://tinybase.org/api/store/type-aliases/store/value/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `ComputedRef<boolean>`: A **readonly** reference to a boolean indicating whether a [Value](https://tinybase.org/api/store/type-aliases/store/value/) with that [Id](https://tinybase.org/api/common/type-aliases/identity/id/) exists in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useHasValue, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const hasValue = useHasValue(store, 'employees')

store.setValue('open', true)
// UI will show: false

store.setValue('employees', 3)
// UI will show: true
</script>

<template>
  <div>{{ hasValue }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useHasValue, injectStore } from 'vue-tinybase'

const store = injectStore()

const hasValue = useHasValue('employees')

store.setValue('open', true)
// UI will show: false

store.setValue('employees', 3)
// UI will show: true
</script>

<template>
  <div>{{ hasValue }}</div>
</template>
```

</div>

## useHasValues {#use-has-values}

The `useHasValues` composable returns a **readonly** reference to a boolean indicating whether any [Values](https://tinybase.org/api/store/type-aliases/store/values/) exist in the [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Values](https://tinybase.org/api/store/type-aliases/store/values/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

<div class="hide-default-store">

### Parameters

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `ComputedRef<boolean>`: A **readonly** reference to a boolean indicating whether any [Values](https://tinybase.org/api/store/type-aliases/store/values/) exist in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useHasValues, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const hasValues = useHasValues(store)

store.setValue('open', true)
// UI will show: true

store.delValue('open')
// UI will show: false
</script>

<template>
  <div>{{ hasValues }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useHasValues, injectStore } from 'vue-tinybase'

const store = injectStore()

const hasValues = useHasValues()

store.setValue('open', true)
// UI will show: true

store.delValue('open')
// UI will show: false
</script>

<template>
  <div>{{ hasValues }}</div>
</template>
```

</div>

## useRow {#use-row}

The `useRow` composable returns a **readonly** reference to the object containing the data of a single [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Row](https://tinybase.org/api/store/type-aliases/store/row/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **writable** alternative to this composable called [`rowRef`](/api/store/references#row-ref)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Returns

- `ComputedRef<`[`Row`](https://tinybase.org/api/store/type-aliases/store/row/)`>`: A **readonly** reference to an object containing the entire data of the [Row](https://tinybase.org/api/store/type-aliases/store/row/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useRow, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const row = useRow(store, 'pets', 'fido')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: {"color":"brown"}

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: {"color":"walnut"}
</script>

<template>
  <div>{{ row }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useRow, injectStore } from 'vue-tinybase'

const store = injectStore()

const row = useRow('pets', 'fido')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: {"color":"brown"}

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: {"color":"walnut"}
</script>

<template>
  <div>{{ row }}</div>
</template>
```

</div>

## useRowCount {#use-row-count}

The `useRowCount` composable returns a **readonly** reference to the count of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) objects in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the count of [Row](https://tinybase.org/api/store/type-aliases/store/row/) objects will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `ComputedRef<number>`: A **readonly** reference to the number of [Row](https://tinybase.org/api/store/type-aliases/store/row/) objects in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useRowCount, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const rowCount = useRowCount(store, 'pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: 1

store.setCell('pets', 'felix', 'color', 'black')
// UI will show: 2
</script>

<template>
  <div>{{ rowCount }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useRowCount, injectStore } from 'vue-tinybase'

const store = injectStore()

const rowCount = useRowCount('pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: 1

store.setCell('pets', 'felix', 'color', 'black')
// UI will show: 2
</script>

<template>
  <div>{{ rowCount }}</div>
</template>
```

</div>

## useRowIds {#use-row-ids}

The `useRowIds` composable returns a **readonly** reference to the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `ComputedRef<`[`Ids`](https://tinybase.org/api/common/type-aliases/identity/ids/)`>`: A **readonly** reference to an array of the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useRowIds, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const rowIds = useRowIds(store, 'pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["fido"]

store.setCell('pets', 'felix', 'color', 'black')
// UI will show: ["fido", "felix"]
</script>

<template>
  <div>{{ rowIds }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useRowIds, injectStore } from 'vue-tinybase'

const store = injectStore()

const rowIds = useRowIds('pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["fido"]

store.setCell('pets', 'felix', 'color', 'black')
// UI will show: ["fido", "felix"]
</script>

<template>
  <div>{{ rowIds }}</div>
</template>
```

</div>

## useTable {#use-table}

The `useTable` composable returns a **readonly** reference to an object containing the data of a single [Table](https://tinybase.org/api/store/type-aliases/store/table/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Table](https://tinybase.org/api/store/type-aliases/store/table/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **writable** alternative to this composable called [`tableRef`](/api/store/references#table-ref)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `ComputedRef<`[`Table`](https://tinybase.org/api/store/type-aliases/store/table/)`>`: A **readonly** reference to an object containing the entire data of the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useTable, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const table = useTable(store, 'pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: {"fido":{"color":"brown"}}

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: {"fido":{"color":"walnut"}}
</script>

<template>
  <div>{{ table }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useTable, injectStore } from 'vue-tinybase'

const store = injectStore()

const table = useTable('pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: {"fido":{"color":"brown"}}

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: {"fido":{"color":"walnut"}}
</script>

<template>
  <div>{{ table }}</div>
</template>
```

</div>

## useTableCellIds {#use-table-cell-ids}

The `useTableCellIds` composable returns a **readonly** reference to the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) used across the whole [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `ComputedRef<`[`Ids`](https://tinybase.org/api/common/type-aliases/identity/ids/)`>`: A **readonly** reference to an array of the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) used across the whole [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useTableCellIds, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const cellIds = useTableCellIds(store, 'pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["color"]

store.setCell('pets', 'felix', 'species', 'cat')
// UI will show: ["color", "species"]
</script>

<template>
  <div>{{ cellIds }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useTableCellIds, injectStore } from 'vue-tinybase'

const store = injectStore()

const cellIds = useTableCellIds('pets')

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["color"]

store.setCell('pets', 'felix', 'species', 'cat')
// UI will show: ["color", "species"]
</script>

<template>
  <div>{{ cellIds }}</div>
</template>
```

</div>

## useTableIds {#use-table-ids}

The `useTableIds` composable returns a **readonly** reference to the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Table](https://tinybase.org/api/store/type-aliases/store/table/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

<div class="hide-default-store">

### Parameters

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `ComputedRef<`[`Ids`](https://tinybase.org/api/common/type-aliases/identity/ids/)`>`: A **readonly** reference to an array of the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useTableIds, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const tableIds = useTableIds(store)

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["pets"]

store.setCell('species', 'dog', 'price', 5)
// UI will show: ["pets", "species"]
</script>

<template>
  <div>{{ tableIds }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useTableIds, injectStore } from 'vue-tinybase'

const store = injectStore()

const tableIds = useTableIds()

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: ["pets"]

store.setCell('species', 'dog', 'price', 5)
// UI will show: ["pets", "species"]
</script>

<template>
  <div>{{ tableIds }}</div>
</template>
```

</div>

## useTables {#use-tables}

The `useTables` composable returns a **readonly** reference to a [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) object containing the tabular data of a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **writable** alternative to this composable called [`tablesRef`](/api/store/references#tables-ref)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `ComputedRef<`[`Tables`](https://tinybase.org/api/store/type-aliases/store/tables/)`>`: A **readonly** reference to the [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) object containing the tabular data of the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useTables, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const tables = useTables(store)

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: {"pets":{"fido":{"color":"brown"}}}

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: {"pets":{"fido":{"color":"walnut"}}}
</script>

<template>
  <div>{{ tables }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useTables, injectStore } from 'vue-tinybase'

const store = injectStore()

const tables = useTables()

store.setCell('pets', 'fido', 'color', 'brown')
// UI will show: {"pets":{"fido":{"color":"brown"}}}

store.setCell('pets', 'fido', 'color', 'walnut')
// UI will show: {"pets":{"fido":{"color":"walnut"}}}
</script>

<template>
  <div>{{ tables }}</div>
</template>
```

</div>

## useValue {#use-value}

The `useValue` composable returns a **readonly** reference to an object containing the data of a single [Value](https://tinybase.org/api/store/type-aliases/store/value/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Value](https://tinybase.org/api/store/type-aliases/store/value/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **writable** alternative to this composable called [`valueRef`](/api/store/references#value-ref)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `valueId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Value](https://tinybase.org/api/store/type-aliases/store/value/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `ComputedRef<`[`Value`](https://tinybase.org/api/store/type-aliases/store/value/)`>`: A **readonly** reference to the [Value](https://tinybase.org/api/store/type-aliases/store/value/) object containing the data of the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useValue, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const value = useValue(store, 'open')

store.setValue('open', true)
// UI will show: true

store.setValue('open', false)
// UI will show: false
</script>

<template>
  <div>{{ value }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useValue, injectStore } from 'vue-tinybase'

const store = injectStore()

const value = useValue('open')

store.setValue('open', true)
// UI will show: true

store.setValue('open', false)
// UI will show: false
</script>

<template>
  <div>{{ value }}</div>
</template>
```

</div>

## useValueIds {#use-value-ids}

The `useValueIds` composable returns a **readonly** reference to the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Value](https://tinybase.org/api/store/type-aliases/store/value/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Value](https://tinybase.org/api/store/type-aliases/store/value/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `ComputedRef<`[`Ids`](https://tinybase.org/api/common/type-aliases/identity/ids/)`>`: A **readonly** reference to an array of the [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) of every [Value](https://tinybase.org/api/store/type-aliases/store/value/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useValueIds, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const valueIds = useValueIds(store)

store.setValue('open', true)
// UI will show: ["open"]

store.setValue('employees', 3)
// UI will show: ["open", "employees"]
</script>

<template>
  <div>{{ valueIds }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useValueIds, injectStore } from 'vue-tinybase'

const store = injectStore()

const valueIds = useValueIds()

store.setValue('open', true)
// UI will show: ["open"]

store.setValue('employees', 3)
// UI will show: ["open", "employees"]
</script>

<template>
  <div>{{ valueIds }}</div>
</template>
```

</div>

## useValues {#use-values}

The `useValues` composable returns a **readonly** reference to a [Values](https://tinybase.org/api/store/type-aliases/store/values/) object containing the keyed value data of a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the [Values](https://tinybase.org/api/store/type-aliases/store/values/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **writable** alternative to this composable called [`valuesRef`](/api/store/references#values-ref)

<div class="hide-default-store">

### Parameters

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `ComputedRef<`[`Values`](https://tinybase.org/api/store/type-aliases/store/values/)`>`: A **readonly** reference to a [Values](https://tinybase.org/api/store/type-aliases/store/values/) object containing the keyed value data of the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { useValues, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const values = useValues(store)

store.setValue('open', true)
// UI will show: {"open": true}

store.setValue('employees', 3)
// UI will show: {"open": true, "employees": 3}
</script>

<template>
  <div>{{ values }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { useValues, injectStore } from 'vue-tinybase'

const store = injectStore()

const values = useValues()

store.setValue('open', true)
// UI will show: {"open": true}

store.setValue('employees', 3)
// UI will show: {"open": true, "employees": 3}
</script>

<template>
  <div>{{ values }}</div>
</template>
```

</div>
