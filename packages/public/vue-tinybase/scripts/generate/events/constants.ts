import { resolve } from 'node:path'

import { TARGET_DIRECTORY } from '../constants.js'

export const TARGET_DIRECTORY_EVENTS = resolve(TARGET_DIRECTORY, 'events')
export const TARGET_DIRECTORY_EVENTS_CUSTOM_STORE = resolve(TARGET_DIRECTORY_EVENTS, 'custom-store')
export const TARGET_DIRECTORY_EVENTS_DEFAULT_STORE = resolve(TARGET_DIRECTORY_EVENTS, 'default-store')
