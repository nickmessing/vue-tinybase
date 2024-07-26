import type { UseCheckpointFunction as UseCheckpointFunctionWithSchemas } from './with-schemas/composables.js'
import type { UseCheckpointFunction as UseCheckpointFunctionWithoutSchemas } from './without-schemas/composables.js'

export type UseCheckpointFunction = UseCheckpointFunctionWithSchemas & UseCheckpointFunctionWithoutSchemas

export type { UseCheckpointFunction as UseCheckpointFunctionWithSchemas } from './with-schemas/composables.js'
export type { UseCheckpointFunction as UseCheckpointFunctionWithoutSchemas } from './without-schemas/composables.js'
