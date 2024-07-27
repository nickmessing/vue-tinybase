import type {
  UseCheckpointFunction as UseCheckpointFunctionWithSchemas,
  UseCheckpointIdsFunction as UseCheckpointIdsFunctionWithSchemas,
} from './with-schemas/composables.js'
import type {
  UseCheckpointFunction as UseCheckpointFunctionWithoutSchemas,
  UseCheckpointIdsFunction as UseCheckpointIdsFunctionWithoutSchemas,
} from './without-schemas/composables.js'

export type UseCheckpointFunction = UseCheckpointFunctionWithSchemas & UseCheckpointFunctionWithoutSchemas
export type UseCheckpointIdsFunction = UseCheckpointIdsFunctionWithSchemas & UseCheckpointIdsFunctionWithoutSchemas

export type {
  UseCheckpointFunction as UseCheckpointFunctionWithSchemas,
  UseCheckpointIdsFunction as UseCheckpointIdsFunctionWithSchemas,
} from './with-schemas/composables.js'
export type {
  UseCheckpointFunction as UseCheckpointFunctionWithoutSchemas,
  UseCheckpointIdsFunction as UseCheckpointIdsFunctionWithoutSchemas,
} from './without-schemas/composables.js'
