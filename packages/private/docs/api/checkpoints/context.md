# Context {#context}

Context-related functions for providing and injecting checkpoints object into the app or part of the app.

For all the examples assume the following `store.ts` file:

<div class="hide-custom-store">

```ts
import { createStore, createCheckpoints } from 'tinybase'

export const store = createStore()
export const checkpoints = createCheckpoints(store)
```

</div>

<div class="hide-default-store">

```ts
import { createStore, createCheckpoints } from 'tinybase'
import type { InjectionKey } from 'vue'

export const store1 = createStore()
export const store2 = createStore()

export const checkpoints1 = createCheckpoints(store1)
export const checkpoints2 = createCheckpoints(store2)

export const Store1Key = Symbol('Store1') as InjectionKey<typeof store1>
export const Store2Key = Symbol('Store2') as InjectionKey<typeof store2>

export const Checkpoints1Key = Symbol('Checkpoints1') as InjectionKey<typeof checkpoints1>
export const Checkpoints2Key = Symbol('Checkpoints2') as InjectionKey<typeof checkpoints2>
```

</div>

## provideCheckpoints {#provide-checkpoints}

Provide a checkpoints object to all child components, enabling them to access the checkpoints object without having to pass it down as a prop.

- **Parameters**

  <div class="hide-default-store">

  - `checkpointsKey` (`string | symbol`): Unique injection key.

  </div>

  - `checkpoints` ([`Checkpoints`](https://tinybase.org/api/checkpoints/interfaces/checkpoints/checkpoints/)): The checkpoints object to provide.

- **Example**

  <div class="hide-custom-store">

  ```vue
  <script setup lang="ts">
  import { provideCheckpoints } from 'vue-tinybase'

  import { checkpoints } from './store'

  provideCheckpoints(checkpoints)
  </script>
  ```

  </div>

  <div class="hide-default-store">

  ```vue
  <script setup lang="ts">
  import { provideCheckpoints } from 'vue-tinybase/custom-store'

  import { checkpoints1, checkpoints2, Checkpoints1Key, Checkpoints2Key } from './store'

  provideCheckpoints(Checkpoints1Key, checkpoints1)
  provideCheckpoints(Checkpoints2Key, checkpoints2)
  </script>
  ```

  </div>

## injectCheckpoints {#inject-checkpoints}

Inject a checkpoints object provided by [`provideCheckpoints`](/api/checkpoints/context#provide-checkpoints).

<div class="hide-default-store">

- **Parameters**

  - `checkpointsKey` (`string | symbol`): Checkpoints object injection key.

</div>

- **Example**

  <div class="hide-custom-store">

  ```vue
  <script setup lang="ts">
  import { injectCheckpoints } from 'vue-tinybase'

  const store = injectCheckpoints()
  </script>
  ```

  </div>

  <div class="hide-default-store">

  ```vue
  <script setup lang="ts">
  import { injectCheckpoints } from 'vue-tinybase/custom-store'

  import { Checkpoints1Key } from './store'

  const checkpoints1 = injectCheckpoints(Checkpoints1Key)
  </script>
  ```

  </div>
