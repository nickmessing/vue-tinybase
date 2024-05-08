import { resolve } from 'node:path'

export const TARGET_DIRECTORY = resolve(import.meta.dirname, '../../src/generated')

// Crossing fingers that this file doesn't get overhauled
export const STORE_DEFINITION_URL =
  'https://raw.githubusercontent.com/tinyplex/tinybase/main/src/types/with-schemas/store.d.ts'
