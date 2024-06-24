# Context {#context}

Context-related functions for providing and injecting stores into the app or part of the app.

For all the examples assume the following `store.ts` file:

<div class="hide-custom-store">

```ts
import { createStore } from 'tinybase'

export const store = createStore()
```

</div>

<div class="hide-default-store">

```ts
import { createStore } from 'tinybase'
import type { InjectionKey } from 'vue'

export const store1 = createStore()
export const store2 = createStore()

export const Store1Key = Symbol('Store1') as InjectionKey<typeof store1>
export const Store2Key = Symbol('Store2') as InjectionKey<typeof store2>
```

</div>

## provideStore {#provide-store}

Provide a store to all child components, enabling them to access the store without having to pass it down as a prop.

- **Parameters**

  <div class="hide-default-store">

  - `storeKey` (`string | symbol`): Unique injection key.

  </div>

  - `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to provide.

- **Example**

  <div class="hide-custom-store">

  ```vue
  <script setup lang="ts">
  import { provideStore } from 'vue-tinybase'

  import { store } from './store'

  provideStore(store)
  </script>
  ```

  </div>

  <div class="hide-default-store">

  ```vue
  <script setup lang="ts">
  import { provideStore } from 'vue-tinybase/custom-store'

  import { store1, store2, Store1Key, Store2Key } from './store'

  provideStore(Store1Key, store1)
  provideStore(Store2Key, store2)
  </script>
  ```

  </div>

## injectStore {#inject-store}

Inject a store provided by [`provideStore`](/api/store/context#provide-store).

<div class="hide-default-store">

- **Parameters**

  - `storeKey` (`string | symbol`): Store injection key.

</div>

- **Example**

  <div class="hide-custom-store">

  ```vue
  <script setup lang="ts">
  import { injectStore } from 'vue-tinybase'

  const store = injectStore()
  </script>
  ```

  </div>

  <div class="hide-default-store">

  ```vue
  <script setup lang="ts">
  import { injectStore } from 'vue-tinybase/custom-store'

  import { Store1Key } from './store'

  const store1 = injectStore(Store1Key)
  </script>
  ```

  </div>
