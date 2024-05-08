import { resolve } from 'node:path'

import { TARGET_DIRECTORY } from '../constants.js'

export const TARGET_DIRECTORY_COMPOSABLES = resolve(TARGET_DIRECTORY, 'composables')
export const TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE = resolve(TARGET_DIRECTORY_COMPOSABLES, 'custom-store')
export const TARGET_DIRECTORY_COMPOSABLES_DEFAULT_STORE = resolve(TARGET_DIRECTORY_COMPOSABLES, 'default-store')
