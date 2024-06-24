# Composables {#composables}

Composables used in the library.

## useListener {#use-listener}

Listen to a store event and call a callback whenever the event is emitted.

Used internally in event listeners.

- **Parameters**

  - `store` ([`Store`](https://tinybase.org/api/store/interfaces/store/store/)): The store to listen to.
  - `listenerCreator` (`(store: Store) => string`): A function that starts the listener and returns the listener's ID. The listenerCreator function should access all reactive properties synchronously.
  - `options`<span class="blue">?</span> ([`UseListenerOptions`](/api/common/types#use-listener-options)): Options for the listener.

- **Returns**

  - Object with the following properties:

    - `startListening` (`() => void`): Start the listener.
    - `stopListening` (`() => void`): Stop the listener.
    - `isListening` (`Ref<boolean>`): Whether the listener is currently listening.
    - `listenerId` (`Ref<string | undefined>`): The listener's ID.
