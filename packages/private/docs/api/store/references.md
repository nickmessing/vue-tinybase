# References {#references}

Store's references.

> [!IMPORTANT]
> The references are not deep-reactive, you have to assign a new value to the reference when you want to update the data.

## cellRef {#cell-ref}

The `cellRef` function returns a **writable** reference to an object containing the value of a single [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in a given [Row](https://tinybase.org/api/store/type-aliases/store/row/), in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this function will create a listener so that changes to the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) will cause a re-render. When the component containing this reference is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **readonly** alternative to this reference called [`useCell`](/api/store/composables#use-cell)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).
- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in the [Row](https://tinybase.org/api/store/type-aliases/store/row/).

### Returns

- `WritableComputedRef<`[`CellOrUndefined`](https://tinybase.org/api/store/type-aliases/store/cellorundefined/)`>`: A **writable** reference to the value of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { cellRef, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const cell = cellRef(store, 'pets', 'fido', 'color')

cell.value = 'brown'
// UI will show: 'brown'
// same as: store.setCell('pets', 'fido', 'color', 'brown')

cell.value = 'walnut'
// UI will show: 'walnut'
// same as: store.setCell('pets', 'fido', 'color', 'walnut')
</script>

<template>
  <div>{{ cell }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { cellRef } from 'vue-tinybase'

const cell = cellRef('pets', 'fido', 'color')

cell.value = 'brown'
// UI will show: 'brown'
// same as: store.setCell('pets', 'fido', 'color', 'brown')

cell.value = 'walnut'
// UI will show: 'walnut'
// same as: store.setCell('pets', 'fido', 'color', 'walnut')
</script>

<template>
  <div>{{ cell }}</div>
</template>
```

</div>

## rowRef {#row-ref}

The `rowRef` function returns a **writable** reference to the object containing the data of a single [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a given [Table](https://tinybase.org/api/store/type-aliases/store/table/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this function will create a listener so that changes to the [Row](https://tinybase.org/api/store/type-aliases/store/row/) will cause a re-render. When the component containing this reference is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **readonly** alternative to this reference called [`useRow`](/api/store/composables#use-row)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Returns

- `WritableComputedRef<Row>`: A **writable** reference to an object containing the entire data of the [Row](https://tinybase.org/api/store/type-aliases/store/row/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { rowRef, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const row = rowRef(store, 'pets', 'fido')

row.value = { color: 'brown' }
// UI will show: {"color":"brown"}
// same as: store.setRow('pets', 'fido', { color: 'brown' })

row.value = { color: 'walnut' }
// UI will show: {"color":"walnut"}
// same as: store.setRow('pets', 'fido', { color: 'walnut' })
</script>

<template>
  <div>{{ row }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { rowRef } from 'vue-tinybase'

const row = rowRef('pets', 'fido')

row.value = { color: 'brown' }
// UI will show: {"color":"brown"}
// same as: store.setRow('pets', 'fido', { color: 'brown' })

row.value = { color: 'walnut' }
// UI will show: {"color":"walnut"}
// same as: store.setRow('pets', 'fido', { color: 'walnut' })
</script>

<template>
  <div>{{ row }}</div>
</template>
```

</div>

## tableRef {#table-ref}

The `tableRef` function returns a **writable** reference to an object containing the data of a single [Table](https://tinybase.org/api/store/type-aliases/store/table/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this function will create a listener so that changes to the [Table](https://tinybase.org/api/store/type-aliases/store/table/) will cause a re-render. When the component containing this reference is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **readonly** alternative to this reference called [`useTable`](/api/store/composables#use-table)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `WritableComputedRef<`[`Table`](https://tinybase.org/api/store/type-aliases/store/table/)`>`: A **readonly** reference to an object containing the entire data of the [Table](https://tinybase.org/api/store/type-aliases/store/table/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { tableRef, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const table = tableRef(store, 'pets')

table.value = { fido: { color: 'brown' } }
// UI will show: {"fido":{"color":"brown"}}
// same as: store.setTable('pets', { fido: { color: 'brown' } })

table.value = { fido: { color: 'walnut' } }
// UI will show: {"fido":{"color":"walnut"}}
// same as: store.setTable('pets', { fido: { color: 'walnut' } })
</script>

<template>
  <div>{{ table }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { tableRef } from 'vue-tinybase'

const table = useTable('pets')

table.value = { fido: { color: 'brown' } }
// UI will show: {"fido":{"color":"brown"}}
// same as: store.setTable('pets', { fido: { color: 'brown' } })

table.value = { fido: { color: 'walnut' } }
// UI will show: {"fido":{"color":"walnut"}}
// same as: store.setTable('pets', { fido: { color: 'walnut' } })
</script>

<template>
  <div>{{ table }}</div>
</template>
```

</div>

## tablesRef {#tables-ref}

The `tablesRef` function returns a **writable** reference to a [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) object containing the tabular data of a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this function will create a listener so that changes to the [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) will cause a re-render. When the component containing this reference is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **readonly** alternative to this function called [`useTables`](/api/store/composables#use-tables)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `WritableComputedRef<`[`Tables`](https://tinybase.org/api/store/type-aliases/store/tables/)`>`: A **writable** reference to the [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) object containing the tabular data of the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { tablesRef, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const tables = tablesRef(store)

tables.value = { pets: { fido: { color: 'brown' } } }
// UI will show: {"pets":{"fido":{"color":"brown"}}}
// same as: store.setTables({ pets: { fido: { color: 'brown' } })

tables.value = { pets: { fido: { color: 'walnut' } } }
// UI will show: {"pets":{"fido":{"color":"walnut"}}}
// same as: store.setTables({ pets: { fido: { color: 'walnut' } })
</script>

<template>
  <div>{{ tables }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { tablesRef } from 'vue-tinybase'

const tables = tablesRef()

tables.value = { pets: { fido: { color: 'brown' } } }
// UI will show: {"pets":{"fido":{"color":"brown"}}}
// same as: store.setTables({ pets: { fido: { color: 'brown' } })

tables.value = { pets: { fido: { color: 'walnut' } } }
// UI will show: {"pets":{"fido":{"color":"walnut"}}}
// same as: store.setTables({ pets: { fido: { color: 'walnut' } })
</script>

<template>
  <div>{{ tables }}</div>
</template>
```

</div>

## valueRef {#value-ref}

The `valueRef` function returns a **writable** reference to an object containing the data of a single [Value](https://tinybase.org/api/store/type-aliases/store/value/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this function will create a listener so that changes to the [Value](https://tinybase.org/api/store/type-aliases/store/value/) will cause a re-render. When the component containing this reference is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **writable** alternative to this function called [`useValue`](/api/store/composables#use-value)

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `valueId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Value](https://tinybase.org/api/store/type-aliases/store/value/) in a [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Returns

- `WritableComputedRef<`[`Value`](https://tinybase.org/api/store/type-aliases/store/value/)`>`: A **writable** reference to the [Value](https://tinybase.org/api/store/type-aliases/store/value/) object containing the data of the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { valueRef, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const value = valueRef(store, 'open')

value.value = true
// UI will show: true
// same as: store.setValue('open', true)

value.value = false
// UI will show: false
// same as: store.setValue('open', false)
</script>

<template>
  <div>{{ value }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { valueRef } from 'vue-tinybase'

const value = valueRef('open')

value.value = true
// UI will show: true
// same as: store.setValue('open', true)

value.value = false
// UI will show: false
// same as: store.setValue('open', false)
</script>

<template>
  <div>{{ value }}</div>
</template>
```

</div>

## valuesRef {#values-ref}

The `valuesRef` function returns a **writable** reference to a [Values](https://tinybase.org/api/store/type-aliases/store/values/) object containing the keyed value data of a [Store](https://tinybase.org/api/store/interfaces/store/store/), and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this function will create a listener so that changes to the [Values](https://tinybase.org/api/store/type-aliases/store/values/) will cause a re-render. When the component containing this reference is unmounted, the listener will be automatically removed.

> [!NOTE]
> There's a **readonly** alternative to this function called [`useValues`](/api/store/composables#use-values)

<div class="hide-default-store">

### Parameters

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

### Returns

- `WritableComputedRef<`[`Values`](https://tinybase.org/api/store/type-aliases/store/values/)`>`: A **writable** reference to a [Values](https://tinybase.org/api/store/type-aliases/store/values/) object containing the keyed value data of the [Store](https://tinybase.org/api/store/interfaces/store/store/).

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { valuesRef, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

const values = valuesRef(store)

values.value = { open: true }
// UI will show: {"open": true}
// same as: store.setValues({ open: true })

values.value = { open: true, employees: 3 }
// UI will show: {"open": true, "employees": 3}
// same as: store.setValues({ open: true, employees: 3 })
</script>

<template>
  <div>{{ values }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { valuesRef } from 'vue-tinybase'

const values = valuesRef()

values.value = { open: true }
// UI will show: {"open": true}
// same as: store.setValues({ open: true })

values.value = { open: true, employees: 3 }
// UI will show: {"open": true, "employees": 3}
// same as: store.setValues({ open: true, employees: 3 })
</script>

<template>
  <div>{{ values }}</div>
</template>
```

</div>
