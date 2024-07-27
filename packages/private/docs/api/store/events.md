# Events {#events}

Store's event hooks.

<div class="hide-custom-store">

> [!NOTE]
> To use these event hooks with the "default" store, you need to have the store provided with the [`provideStore`](/api/store/context#provide-store) function in a parent component. We recommend providing the store in the `createApp` call just like the [example in the guide](/guide/getting-started/connect-to-vuejs-app#provide-the-store-to-your-vue-app).

</div>

## onCellChange {#on-cell-change}

The `onCellChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever data in a [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) changes.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useCell](/api/store/composables#use-cell) composable).

You can either listen to a single [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) (by specifying the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/), [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/), and [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first three parameters) or changes to any [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) (by providing `null` wildcards).

All, some, or none of the `tableId`, `rowId`, and `cellId` parameters can be wildcarded with null. You can listen to a specific [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in a specific [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), any [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in any [Row](https://tinybase.org/api/store/type-aliases/store/row/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/), for example - or every other combination of wildcards.

Unlike the [addCellListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addcelllistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onCellChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) to listen to, or `null` as a wildcard.
- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) to listen to, or `null` as a wildcard.
- `listener` ([`CellListener`](https://tinybase.org/api/store/type-aliases/listener/celllistener/)): The function that will be called whenever data in the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) changes.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`) An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onCellChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onCellChange, injectStore } from 'vue-tinybase'

onCellChange('pets', 'fido', 'color', () => {
  console.log('Cell changed')
})

const store = injectStore()

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Cell changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onCellChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onCellChange(store, 'pets', 'fido', 'color', () => {
  console.log('Store 1 Cell changed')
})

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Store 1 Cell changed'
</script>
```

</div>

## onCellIdsChange {#on-cell-ids-change}

The `onCellIdsChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in a [Row](https://tinybase.org/api/store/type-aliases/store/row/) change.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useCellIds](/api/store/composables#use-cell-ids) composable).

You can either listen to a single [Row](https://tinybase.org/api/store/type-aliases/store/row/) (by specifying the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first two parameters) or changes to any [Row](https://tinybase.org/api/store/type-aliases/store/row/) (by providing `null` wildcards).

Both, either, or neither of the `tableId` and `rowId` parameters can be wildcarded with `null`. You can listen to a specific [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), any [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), a specific [Row](https://tinybase.org/api/store/type-aliases/store/row/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/), or any [Row](https://tinybase.org/api/store/type-aliases/store/row/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/).

Unlike the [addCellIdsListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addcellidslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onCellIdsChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) to listen to, or `null` as a wildcard.
- `listener` ([`CellIdsListener`](https://tinybase.org/api/store/type-aliases/listener/cellidslistener/)): The function that will be called whenever the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in a [Row](https://tinybase.org/api/store/type-aliases/store/row/) change.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`) An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onCellIdsChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onCellIdsChange, injectStore } from 'vue-tinybase'

onCellIdsChange('pets', 'fido', () => {
  console.log('Cell Ids changed')
})

const store = injectStore()

store.setCell('pets', 'fido', 'species', 'dog')
// -> 'Cell Ids changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onCellIdsChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onCellIdsChange(store, 'pets', 'fido', () => {
  console.log('Store 1 Cell Ids changed')
})

store.setCell('pets', 'fido', 'species', 'dog')
// -> 'Store 1 Cell Ids changed'
</script>
```

</div>

## onDidFinishTransaction {#on-did-finish-transaction}

The `onDidFinishTransaction` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called just after other non-mutating listeners are called at the end of the transaction.

Unlike the [addDidFinishTransactionListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/adddidfinishtransactionlistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onDidFinishTransaction` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`DidFinishTransactionListener`](https://tinybase.org/api/store/type-aliases/listener/didfinishtransactionlistener/)): The function that will be called just after other non-mutating listeners are called at the end of the transaction.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onDidFinishTransaction` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onDidFinishTransaction, injectStore } from 'vue-tinybase'

onDidFinishTransaction(() => {
  console.log('Transaction finished')
})

const store = injectStore()

store.setValue('open', false)
// -> 'Transaction finished'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onDidFinishTransaction, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onDidFinishTransaction(store, () => {
  console.log('Store 1 Transaction finished')
})

store.setValue('open', false)
// -> 'Store 1 Transaction finished'
</script>
```

</div>

## onHasCellChange {#on-has-cell-change}

The `onHasCellChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called when a [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) is added to or removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the existence of a cell (which is more easily done with the [useHasCell](/api/store/composables#use-has-cell) composable).

You can either listen to a single [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) being added or removed (by specifying the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/), [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/), and [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first three parameters) or changes to any [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) (by providing `null` wildcards).

All, some, or none of the `tableId`, `rowId`, and `cellId` parameters can be wildcarded with `null`. You can listen to a specific [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in a specific [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), any [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in any [Row](https://tinybase.org/api/store/type-aliases/store/row/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/), for example - or every other combination of wildcards.

Unlike the [addHasCellListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addhascelllistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onHasCellChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) to listen to, or `null` as a wildcard.
- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) to listen to, or `null` as a wildcard.
- `listener` ([`HasCellListener`](https://tinybase.org/api/store/type-aliases/listener/hascelllistener/)): The function that will be called whenever the matching [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) is added or removed.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`) An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onHasCellChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onHasCellChange, injectStore } from 'vue-tinybase'

onHasCellChange('pets', 'fido', 'color', () => {
  console.log('Cell existence changed')
})

const store = injectStore()

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Cell existence changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onHasCellChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onHasCellChange(store, 'pets', 'fido', 'color', () => {
  console.log('Store 1 Cell existence changed')
})

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Store 1 Cell existence changed'
</script>
```

</div>

## onHasRowChange {#on-has-row-change}

The `onHasRowChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called when a [Row](https://tinybase.org/api/store/type-aliases/store/row/) is added to or removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useHasRow](/api/store/composables#use-has-row) composable).

You can either listen to a single [Row](https://tinybase.org/api/store/type-aliases/store/row/) being added or removed (by specifying the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first two parameters) or changes to any [Row](https://tinybase.org/api/store/type-aliases/store/row/) (by providing `null` wildcards).

All, some, or none of the `tableId` and `rowId` parameters can be wildcarded with `null`. You can listen to a specific [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), any [Row](https://tinybase.org/api/store/type-aliases/store/row/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), a specific [Row](https://tinybase.org/api/store/type-aliases/store/row/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/), or any [Row](https://tinybase.org/api/store/type-aliases/store/row/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/).

Unlike the [addHasRowListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addhasrowlistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onHasRowChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) to listen to, or `null` as a wildcard.
- `listener` ([`HasRowListener`](https://tinybase.org/api/store/type-aliases/listener/hasrowlistener/)): The function that will be called whenever the matching [Row](https://tinybase.org/api/store/type-aliases/store/row/) is added or removed.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onHasRowChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onHasRowChange, injectStore } from 'vue-tinybase'

onHasRowChange('pets', 'fido', () => {
  console.log('Row existence changed')
})

const store = injectStore()

store.setCell('pets', 'fido', 'color', 'walnut')
// -> 'Row existence changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onHasRowChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onHasRowChange(store, 'pets', 'fido', () => {
  console.log('Store 1 Row existence changed')
})

store.setCell('pets', 'fido', 'color', 'walnut')
// -> 'Store 1 Row existence changed'
</script>
```

</div>

## onHasTableCellChange {#on-has-table-cell-change}

The `onHasTableCellChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called when a [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) is added to or removed from anywhere in a [Table](https://tinybase.org/api/store/type-aliases/store/table/) as a whole.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useHasTableCell](/api/store/composables#use-has-table-cell) composable).

You can either listen to a single [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) being added or removed (by specifying the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first two parameters) or changes to any [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) (by providing `null` wildcards).

All, some, or none of the `tableId` and `cellId` parameters can be wildcarded with `null`. You can listen to a specific [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), any [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), a specific [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/), or any [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) in any [Table](https://tinybase.org/api/store/type-aliases/store/table/).

Unlike the [addHasTableCellListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addhastablecelllistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onHasTableCellChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) to listen to, or `null` as a wildcard.
- `listener` ([`HasTableCellListener`](https://tinybase.org/api/store/type-aliases/listener/hastablecelllistener/)): The function that will be called whenever the matching [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) is added or removed.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onHasTableCellChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onHasTableCellChange, injectStore } from 'vue-tinybase'

onHasTableCellChange('pets', 'color', () => {
  console.log('Table Cell existence changed')
})

const store = injectStore()

store.setRow('pets', 'fido', { color: 'brown' })
// -> 'Table Cell existence changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onHasTableCellChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onHasTableCellChange(store, 'pets', 'color', () => {
  console.log('Store 1 Table Cell existence changed')
})

store.setRow('pets', 'fido', { color: 'brown' })
// -> 'Store 1 Table Cell existence changed'
</script>
```

</div>

## onHasTableChange {#on-has-table-change}

The `onHasTableChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called when a [Table](https://tinybase.org/api/store/type-aliases/store/table/) is added to or removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useHasTable](/api/store/composables#use-has-table) composable).

You can either listen to a single [Table](https://tinybase.org/api/store/type-aliases/store/table/) being added or removed (by specifying the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first parameter) or changes to any [Table](https://tinybase.org/api/store/type-aliases/store/table/) (by providing a `null` wildcard).

All, some, or none of the `tableId` parameters can be wildcarded with `null`. You can listen to a specific [Table](https://tinybase.org/api/store/type-aliases/store/table/), any [Table](https://tinybase.org/api/store/type-aliases/store/table/), or every other combination of wildcards.

Unlike the [addHasTableListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addhastablelistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onHasTableChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `listener` ([`HasTableListener`](https://tinybase.org/api/store/type-aliases/listener/hastablelistener/)): The function that will be called whenever the matching [Table](https://tinybase.org/api/store/type-aliases/store/table/) is added or removed.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onHasTableChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onHasTableChange, injectStore } from 'vue-tinybase'

onHasTableChange('pets', () => {
  console.log('Table existence changed')
})

const store = injectStore()

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Table existence changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onHasTableChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onHasTableChange(store, 'pets', () => {
  console.log('Store 1 Table existence changed')
})

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Store 1 Table existence changed'
</script>
```

</div>

## onHasTablesChange {#on-has-tables-change}

The `onHasTablesChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called when [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) as a whole are added to or removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useHasTables](/api/store/composables#use-has-tables) composable).

Unlike the [addHasTablesListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addhastableslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onHasTablesChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`HasTablesListener`](https://tinybase.org/api/store/type-aliases/listener/hastableslistener/)): The function that will be called whenever [Tables](https://tinybase.org/api/store/type-aliases/store/tables/) as a whole are added or removed.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onHasTablesChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onHasTablesChange, injectStore } from 'vue-tinybase'

onHasTablesChange(() => {
  console.log('Tables existence changed')
})

const store = injectStore()

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Tables existence changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onHasTablesChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onHasTablesChange(store, () => {
  console.log('Store 1 Tables existence changed')
})

store.setCell('pets', 'fido', 'color', 'brown')
// -> 'Store 1 Tables existence changed'
</script>
```

</div>

## onHasValueChange {#on-has-value-change}

The `onHasValueChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called when a [Value](https://tinybase.org/api/store/type-aliases/store/value/) is added to or removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useHasValue](/api/store/composables#use-has-value) composable).

You can either listen to a single [Value](https://tinybase.org/api/store/type-aliases/store/value/) being added or removed (by specifying the [Value](https://tinybase.org/api/store/type-aliases/store/value/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/)) or any [Value](https://tinybase.org/api/store/type-aliases/store/value/) being added or removed (by providing a `null` wildcard).

Unlike the [addHasValueListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addhasvaluelistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onHasValueChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `valueId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Value](https://tinybase.org/api/store/type-aliases/store/value/) to listen to, or `null` as a wildcard.
- `listener` ([`HasValueListener`](https://tinybase.org/api/store/type-aliases/listener/hasvaluelistener/)): The function that will be called whenever the matching [Value](https://tinybase.org/api/store/type-aliases/store/value/) is added or removed.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onHasValueChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onHasValueChange, injectStore } from 'vue-tinybase'

onHasValueChange('open', () => {
  console.log('Value existence changed')
})

const store = injectStore()

store.setValue('open', false)
// -> 'Value existence changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onHasValueChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onHasValueChange(store, 'open', () => {
  console.log('Store 1 Value existence changed')
})

store.setValue('open', false)
// -> 'Store 1 Value existence changed'
</script>
```

</div>

## onHasValuesChange {#on-has-values-change}

The `onHasValuesChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called when [Values](https://tinybase.org/api/store/type-aliases/store/values/) as a whole are added to or removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the values (which is more easily done with the [useHasValues](/api/store/composables#use-has-values) composable).

Unlike the [addHasValuesListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addhasvalueslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onHasValuesChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`HasValuesListener`](https://tinybase.org/api/store/type-aliases/listener/hasvalueslistener/)): The function that will be called whenever [Values](https://tinybase.org/api/store/type-aliases/store/values/) as a whole are added or removed.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onHasValuesChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onHasValuesChange, injectStore } from 'vue-tinybase'

onHasValuesChange(() => {
  console.log('Values existence changed')
})

const store = injectStore()

store.setValue('open', true)
// -> 'Values existence changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onHasValuesChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onHasValuesChange(store, () => {
  console.log('Store 1 Values existence changed')
})

store.setValue('open', true)
// -> 'Store 1 Values existence changed'
</script>
```

</div>

## onRowChange {#on-row-change}

The `onRowChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever data in a [Row](https://tinybase.org/api/store/type-aliases/store/row/) changes.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the row value (which is more easily done with the [useRow](/api/store/composables#use-row) composable).

Unlike the [addRowListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addrowlistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onRowChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `rowId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) to listen to, or `null` as a wildcard.
- `listener` ([`RowListener`](https://tinybase.org/api/store/type-aliases/listener/rowlistener/)): The function that will be called whenever data in the [Row](https://tinybase.org/api/store/type-aliases/store/row/) changes.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onRowChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onRowChange, injectStore } from 'vue-tinybase'

onRowChange('pets', 'fido', () => {
  console.log('Row changed')
})

const store = injectStore()

store.setCell('pets', 'fido', 'color', 'walnut')
// -> 'Row changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onRowChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onRowChange(store, 'pets', 'fido', () => {
  console.log('Store 1 Row changed')
})

store.setCell('pets', 'fido', 'color', 'walnut')
// -> 'Store 1 Row changed'
</script>
```

</div>

## onRowCountChange {#on-row-count-change}

The `onRowCountChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever the count of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) objects in a [Table](https://tinybase.org/api/store/type-aliases/store/table/) changes.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the row count (which is more easily done with the [useRowCount](/api/store/composables#use-row-count) composable).

Unlike the [addRowCountListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addrowcountlistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onRowCountChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `listener` ([`RowCountListener`](https://tinybase.org/api/store/type-aliases/listener/rowcountlistener/)): The function that will be called whenever the count of the [Row](https://tinybase.org/api/store/type-aliases/store/row/) objects in the [Table](https://tinybase.org/api/store/type-aliases/store/table/) changes.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onRowCountChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onRowCountChange, injectStore } from 'vue-tinybase'

onRowCountChange('pets', () => {
  console.log('Row count changed')
})

const store = injectStore()

store.setRow('pets', 'felix', { color: 'black' })
// -> 'Row count changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onRowCountChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onRowCountChange(store, 'pets', () => {
  console.log('Store 1 Row count changed')
})

store.setRow('pets', 'felix', { color: 'black' })
// -> 'Store 1 Row count changed'
</script>
```

</div>

## onRowIdsChange {#on-row-ids-change}

The `onRowIdsChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever the [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in a [Table](https://tinybase.org/api/store/type-aliases/store/table/) change.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the row Ids (which is more easily done with the [useRowIds](/api/store/composables#use-row-ids) composable).

Unlike the [addRowIdsListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addrowidslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onRowIdsChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `listener` ([`RowIdsListener`](https://tinybase.org/api/store/type-aliases/listener/rowidslistener/)): The function that will be called whenever the [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/) change.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onRowIdsChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onRowIdsChange, injectStore } from 'vue-tinybase'

onRowIdsChange('pets', () => {
  console.log('Row Ids changed')
})

const store = injectStore()

store.setRow('pets', 'felix', { color: 'black' })
// -> 'Row Ids changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onRowIdsChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onRowIdsChange(store, 'pets', () => {
  console.log('Store 1 Row Ids changed')
})

store.setRow('pets', 'felix', { color: 'black' })
// -> 'Store 1 Row Ids changed'
</script>
```

</div>

## onSortedRowIdsChange {#on-sorted-row-ids-change}

The `onSortedRowIdsChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever sorted (and optionally, paginated) [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in a [Table](https://tinybase.org/api/store/type-aliases/store/table/) change.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the sorted row IDs (which is more easily done with the [useSortedRowIds](/api/store/composables#use-sorted-row-ids) composable).

Unlike the [addSortedRowIdsListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addsortedrowidslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onSortedRowIdsChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/).
- `cellId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<undefined | string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) whose values are used for sorting, or `undefined` to sort by the [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Id](https://tinybase.org/api/common/type-aliases/identity/id/) itself.
- `descending` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): Whether the sorting should be in descending order.
- `offset` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<number>`): The number of [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) to skip for pagination purposes, if any.
- `limit` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<undefined | number>`): The maximum number of [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) to return, or `undefined` for all.
- `listener` ([`SortedRowIdsListener`](https://tinybase.org/api/store/type-aliases/listener/sortedrowidslistener/)): The function that will be called whenever the sorted [Row](https://tinybase.org/api/store/type-aliases/store/row/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in the [Table](https://tinybase.org/api/store/type-aliases/store/table/) change.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onSortedRowIdsChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onSortedRowIdsChange, injectStore } from 'vue-tinybase'

onSortedRowIdsChange('pets', 'species', false, 0, undefined, () => {
  console.log('Sorted Row Ids changed')
})

const store = injectStore()

store.setRow('pets', 'cujo', { species: 'wolf' })
// -> 'Sorted Row Ids changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onSortedRowIdsChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onSortedRowIdsChange(store, 'pets', 'species', false, 0, undefined, () => {
  console.log('Store 1 Sorted Row Ids changed')
})

store.setRow('pets', 'cujo', { species: 'wolf' })
// -> 'Store 1 Sorted Row Ids changed'
</script>
```

</div>

## onStartTransaction {#on-start-transaction}

The `onStartTransaction` event hook registers a listener function with the [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called at the start of a transaction.

Unlike the [addStartTransactionListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addstarttransactionlistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onStartTransaction` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`TransactionListener`](https://tinybase.org/api/store/type-aliases/listener/transactionlistener/)): The function that will be called at the start of a transaction.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onStartTransaction` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onStartTransaction, injectStore } from 'vue-tinybase'

onStartTransaction(() => {
  console.log('Start transaction')
})

const store = injectStore()

store.setValue('open', false)
// -> 'Start transaction'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onStartTransaction, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onStartTransaction(store, () => {
  console.log('Store 1 Start transaction')
})

store.setValue('open', false)
// -> 'Store 1 Start transaction'
</script>
```

</div>

## onTableCellIdsChange {#on-table-cell-ids-change}

The `onTableCellIdsChange` event hook registers a listener function with the [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) that appear anywhere in a [Table](https://tinybase.org/api/store/type-aliases/store/table/) change.

Unlike the [addTableCellIdsListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addtablecellidslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onTableCellIdsChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `listener` ([`TableCellIdsListener`](https://tinybase.org/api/store/type-aliases/listener/tablecellidslistener/)): The function that will be called whenever the [Cell](https://tinybase.org/api/store/type-aliases/store/cell/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) that appear anywhere in a [Table](https://tinybase.org/api/store/type-aliases/store/table/) change.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onTableCellIdsChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onTableCellIdsChange, injectStore } from 'vue-tinybase'

onTableCellIdsChange('pets', () => {
  console.log('Cell Ids changed')
})

const store = injectStore()

store.setTables({
  pets: { fido: { color: 'brown' } },
})
// -> 'Cell Ids changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onTableCellIdsChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onTableCellIdsChange(store, 'pets', () => {
  console.log('Store 1 Cell Ids changed')
})

store.setTables({
  pets: { fido: { color: 'brown' } },
})
// -> 'Store 1 Cell Ids changed'
</script>
```

</div>

## onTableChange {#on-table-change}

The `onTableChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever data in a [Table](https://tinybase.org/api/store/type-aliases/store/table/) changes.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useTable](/api/store/composables#use-table) composable).

You can either listen to a single [Table](https://tinybase.org/api/store/type-aliases/store/table/) (by specifying its [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first parameter) or changes to any [Table](https://tinybase.org/api/store/type-aliases/store/table/) (by providing a `null` wildcard).

Unlike the [addTableListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addtablelistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onTableChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `tableId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<`[`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)`>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Table](https://tinybase.org/api/store/type-aliases/store/table/) to listen to, or `null` as a wildcard.
- `listener` ([`TableListener`](https://tinybase.org/api/store/type-aliases/listener/tablelistener/)): The function that will be called whenever data in the [Table](https://tinybase.org/api/store/type-aliases/store/table/) changes.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onTableChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onTableChange, injectStore } from 'vue-tinybase'

onTableChange('pets', () => {
  console.log('Table changed')
})

const store = injectStore()

store.setTable('pets', { fido: { color: 'brown' } })
// -> 'Table changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onTableChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onTableChange(store, 'pets', () => {
  console.log('Store 1 Table changed')
})

store.setTable('pets', { fido: { color: 'brown' } })
// -> 'Store 1 Table changed'
</script>
```

</div>

## onTableIdsChange {#on-table-ids-change}

The `onTableIdsChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in it change.

Unlike the [addTableIdsListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addtableidslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onTableIdsChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`TableIdsListener`](https://tinybase.org/api/store/type-aliases/listener/tableidslistener/)): The function that will be called whenever the [Table](https://tinybase.org/api/store/type-aliases/store/table/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/) change.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onTableIdsChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onTableIdsChange, injectStore } from 'vue-tinybase'

onTableIdsChange(() => {
  console.log('Table Ids changed')
})

const store = injectStore()

store.setTable('pets', { fido: { color: 'brown' } })
// -> 'Table Ids changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onTableIdsChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onTableIdsChange(store, () => {
  console.log('Store 1 Table Ids changed')
})

store.setTable('pets', { fido: { color: 'brown' } })
// -> 'Store 1 Table Ids changed'
</script>
```

</div>

## onTablesChange {#on-tables-change}

The `onTablesChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever tabular data in it changes.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useTables](/api/store/composables#use-tables) composable).

Unlike the [addTablesListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addtableslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onTablesChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`TablesListener`](https://tinybase.org/api/store/type-aliases/listener/tableslistener/)): The function that will be called whenever tabular data in the [Store](https://tinybase.org/api/store/interfaces/store/store/) changes.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onTablesChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onTablesChange, injectStore } from 'vue-tinybase'

onTablesChange(() => {
  console.log('Tables changed')
})

const store = injectStore()

store.setTable('pets', { fido: { color: 'brown' } })
// -> 'Tables changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onTablesChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onTablesChange(store, () => {
  console.log('Store 1 Tables changed')
})

store.setTable('pets', { fido: { color: 'brown' } })
// -> 'Store 1 Tables changed'
</script>
```

</div>

## onValueChange {#on-value-change}

The `onValueChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever data in a [Value](https://tinybase.org/api/store/type-aliases/store/value/) changes.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useValue](/api/store/composables#use-value) composable).

You can either listen to a single [Value](https://tinybase.org/api/store/type-aliases/store/value/) (by specifying its [Id](https://tinybase.org/api/common/type-aliases/identity/id/) as the first parameter) or changes to any [Value](https://tinybase.org/api/store/type-aliases/store/value/) (by providing a `null` wildcard).

Unlike the [addValueListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addvaluelistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onValueChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `valueId` ([`IdOrNull`](https://tinybase.org/api/common/type-aliases/identity/idornull/)): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the [Value](https://tinybase.org/api/store/type-aliases/store/value/) to listen to, or `null` as a wildcard.
- `listener` ([`ValueListener`](https://tinybase.org/api/store/type-aliases/listener/valuelistener/)): The function that will be called whenever data in the [Value](https://tinybase.org/api/store/type-aliases/store/value/) changes.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onValueChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onValueChange, injectStore } from 'vue-tinybase'

onValueChange('open', () => {
  console.log('Value changed')
})

const store = injectStore()

store.setValues({ open: true })
// -> 'Value changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onValueChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onValueChange(store, 'open', () => {
  console.log('Store 1 Value changed')
})

store.setValues({ open: true })
// -> 'Store 1 Value changed'
</script>
```

</div>

## onValueIdsChange {#on-value-ids-change}

The `onValueIdsChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever the [Value](https://tinybase.org/api/store/type-aliases/store/value/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in it change.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useValueIds](/api/store/composables#use-value-ids) composable).

Unlike the [addValueIdsListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addvalueidslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onValueIdsChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`ValueIdsListener`](https://tinybase.org/api/store/type-aliases/listener/valueidslistener/)): The function that will be called whenever the [Value](https://tinybase.org/api/store/type-aliases/store/value/) [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) in the [Store](https://tinybase.org/api/store/interfaces/store/store/) change.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onValueIdsChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onValueIdsChange, injectStore } from 'vue-tinybase'

onValueIdsChange(() => {
  console.log('Value Ids changed')
})

const store = injectStore()

store.setValues({ open: true })
// -> 'Value Ids changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onValueIdsChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onValueIdsChange(store, () => {
  console.log('Store 1 Value Ids changed')
})

store.setValues({ open: true })
// -> 'Store 1 Value Ids changed'
</script>
```

</div>

## onValuesChange {#on-values-change}

The `onValuesChange` event hook registers a listener function with a [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called whenever keyed data in it changes.

This event hook is useful for situations where a component needs to register its own specific listener to do more than simply tracking the value (which is more easily done with the [useValues](/api/store/composables#use-values) composable).

Unlike the [addValuesListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addvalueslistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onValuesChange` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`ValuesListener`](https://tinybase.org/api/store/type-aliases/listener/valueslistener/)): The function that will be called whenever keyed data in the [Store](https://tinybase.org/api/store/interfaces/store/store/) changes.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.
- `mutator`<span class="blue">?</span> ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<boolean>`): An optional boolean that indicates that the listener mutates [Store](https://tinybase.org/api/store/interfaces/store/store/) data.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onValuesChange` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onValuesChange, injectStore } from 'vue-tinybase'

onValuesChange(() => {
  console.log('Values changed')
})

const store = injectStore()

store.setValue('open', false)
// -> 'Values changed'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onValuesChange, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onValuesChange(store, () => {
  console.log('Store 1 Values changed')
})

store.setValue('open', false)
// -> 'Store 1 Values changed'
</script>
```

</div>

## onWillFinishTransaction {#on-will-finish-transaction}

The `onWillFinishTransaction` event hook registers a listener function with the [Store](https://tinybase.org/api/store/interfaces/store/store/) that will be called just before other non-mutating listeners are called at the end of the transaction.

Unlike the [addWillFinishTransactionListener](https://tinybase.org/api/store/interfaces/store/store/methods/listener/addwillfinishtransactionlistener/) method, which returns a listener [Id](https://tinybase.org/api/common/type-aliases/identity/id/) and requires you to remove it manually, the `onWillFinishTransaction` event hook manages this lifecycle for you: when the component unmounts, the listener on the underlying [Store](https://tinybase.org/api/store/interfaces/store/store/) will be deleted.

### Parameters

<div class="hide-default-store">

- `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.

</div>

- `listener` ([`TransactionListener`](https://tinybase.org/api/store/type-aliases/listener/transactionlistener/)): The function that will be called just before other non-mutating listeners are called at the end of the transaction.
- `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.

### Returns

The same as the [`useListener`](/api/common/composables#use-listener) composable.

### Example

This example uses the `onWillFinishTransaction` event hook to create a listener that is scoped to a single component. When the component is unmounted, the listener is removed from the [Store](https://tinybase.org/api/store/interfaces/store/store/).

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { onWillFinishTransaction, injectStore } from 'vue-tinybase'

onWillFinishTransaction(() => {
  console.log('Will finish transaction')
})

const store = injectStore()

store.setValue('open', false)
// -> 'Will finish transaction'
</script>
```

</div>

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { onWillFinishTransaction, injectStore } from 'vue-tinybase/custom-store'

import { Store1Key } from './store'

const store = injectStore(Store1Key)

onWillFinishTransaction(store, () => {
  console.log('Store 1 Will finish transaction')
})

store.setValue('open', false)
// -> 'Store 1 Will finish transaction'
</script>
```

</div>
