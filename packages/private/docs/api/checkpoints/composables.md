# Composables {#composables}

Checkpoints composables.

<div class="hide-custom-store">

> [!NOTE]
> To use these composables with the "default" [Checkpoints](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/) object, you need to have the object provided with the [`provideCheckpoints`](/api/checkpoints/context#provide-checkpoints) function in a parent component. We recommend providing the store in the `createApp` call just like the `provideStore` is used in the [example in the guide](/guide/getting-started/connect-to-vuejs-app#provide-the-store-to-your-vue-app).

</div>

## useCheckpoint {#use-checkpoint}

The `useCheckpoint` composable returns the label for a checkpoint, and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the label will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

### Parameters

<div class="hide-default-store">

- `checkpoints` ([`Checkpoints`](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/)): The [`Checkpoints`](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/) object to be accessed.

</div>

- `checkpointId` ([`MaybeRefOrGetter`](https://vuejs.org/api/utility-types.html#maybereforgetter)`<string>`): The [Id](https://tinybase.org/api/common/type-aliases/identity/id/) of the checkpoint.

### Returns

- `ComputedRef<string | undefined>`: A **readonly** reference to the string label for the requested checkpoint, an empty string if it was never set, or `undefined` if the checkpoint does not exist.

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { injectStore, injectCheckpoints, useCheckpoint } from 'vue-tinybase/custom-store'

import { Store1Key, Checkpoints1Key } from './store'

const store = injectStore(Store1Key)
const checkpoints = injectCheckpoints(Checkpoints1Key)

const checkpointLabel = useCheckpoint(checkpoints, '1')
// UI will be empty

store.setCell('pets', 'fido', 'sold', true)
checkpoints.addCheckpoint('sale')
// UI will show: 'sale'
</script>

<template>
  <div>{{ checkpointLabel }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { injectStore, injectCheckpoints, useCheckpoint } from 'vue-tinybase'

const store = injectStore()

const checkpoints = injectCheckpoints()

const checkpointLabel = useCheckpoint('1')
// UI will be empty

store.setCell('pets', 'fido', 'sold', true)
checkpoints.addCheckpoint('sale')
// UI will show: 'sale'
</script>

<template>
  <div>{{ checkpointLabel }}</div>
</template>
```

</div>

## useCheckpointIds {#use-checkpoint-ids}

The `useCheckpointIds` composable returns an array of the checkpoint [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) being managed by this [Checkpoints](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/) object, and registers a listener so that any changes to that result will cause a re-render.

When first accessed, this composable will create a listener so that changes to the checkpoint [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) will cause a re-render. When the component containing this composable is unmounted, the listener will be automatically removed.

<div class="hide-default-store">

### Parameters

- `checkpoints` ([`Checkpoints`](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/)): The [`Checkpoints`](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/) object to be accessed.

</div>

### Returns

- `ComputedRef<`[`CheckpointIds`](https://tinybase.org/api/checkpoints/type-aliases/identity/checkpointids/)`>`: A **readonly** reference to the [CheckpointIds](https://tinybase.org/api/checkpoints/type-aliases/identity/checkpointids/) array, containing the checkpoint [Ids](https://tinybase.org/api/common/type-aliases/identity/ids/) managed by this [Checkpoints](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/) object.

### Example

<div class="hide-default-store">

```vue
<script setup lang="ts">
import { injectStore, injectCheckpoints, useCheckpointIds } from 'vue-tinybase/custom-store'

import { Store1Key, Checkpoints1Key } from './store'

const store = injectStore(Store1Key)
const checkpoints = injectCheckpoints(Checkpoints1Key)

const checkpointIds = useCheckpointIds(checkpoints)
// UI will show: [[],"0",[]]

store.setCell('pets', 'fido', 'sold', true)
// UI will show: [["0"],null,[]]

checkpoints.addCheckpoint('sale')
// UI will show: [["0"],"1",[]]
</script>

<template>
  <div>{{ checkpointIds }}</div>
</template>
```

</div>

<div class="hide-custom-store">

```vue
<script setup lang="ts">
import { injectStore, injectCheckpoints, useCheckpointIds } from 'vue-tinybase'

const store = injectStore()

const checkpoints = injectCheckpoints()

const checkpointIds = useCheckpointIds()
// UI will show: [[],"0",[]]

store.setCell('pets', 'fido', 'sold', true)
// UI will show: [["0"],null,[]]

checkpoints.addCheckpoint('sale')
// UI will show: [["0"],"1",[]]
</script>

<template>
  <div>{{ checkpointIds }}</div>
</template>
```

</div>
