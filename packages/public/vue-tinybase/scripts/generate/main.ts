import traverseModule from '@babel/traverse'
import { mkdirp } from 'mkdirp'
import { rimraf } from 'rimraf'

import { handleTSInterfaceDeclaration } from './astHandlers/handleTSInterfaceDeclaration.js'
import {
  TARGET_DIRECTORY_COMPOSABLES,
  TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE,
  TARGET_DIRECTORY_COMPOSABLES_DEFAULT_STORE,
} from './composables/constants.js'
import { TARGET_DIRECTORY } from './constants.js'
import { definitionAbstractSyntaxTree } from './definition.js'
import {
  TARGET_DIRECTORY_EVENTS,
  TARGET_DIRECTORY_EVENTS_CUSTOM_STORE,
  TARGET_DIRECTORY_EVENTS_DEFAULT_STORE,
} from './events/constants.js'
import { generateIndexFile } from './events/generators/customStore/generateIndexFile.js'
import { generateDefaultStoreEventHandler } from './events/generators/defaultStore/generateDefaultStoreEventHandler.js'
import { generateDefaultStoreComposable } from './events/generators/defaultStore/generateDefaultStoreComposable.js'

const traverse = traverseModule.default

await rimraf(TARGET_DIRECTORY)

await mkdirp(TARGET_DIRECTORY)
await mkdirp(TARGET_DIRECTORY_EVENTS)
await mkdirp(TARGET_DIRECTORY_EVENTS_CUSTOM_STORE)
await mkdirp(TARGET_DIRECTORY_EVENTS_DEFAULT_STORE)
await mkdirp(TARGET_DIRECTORY_COMPOSABLES)
await mkdirp(TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE)
await mkdirp(TARGET_DIRECTORY_COMPOSABLES_DEFAULT_STORE)

const promisesToWait = [] as Promise<{ composableNames: string[]; eventHandlerNames: string[] }>[]

traverse(definitionAbstractSyntaxTree, {
  TSInterfaceDeclaration(path) {
    promisesToWait.push(handleTSInterfaceDeclaration(path))
  },
})

const eventHandlerNamesLists = await Promise.all(promisesToWait)
// eslint-disable-next-line unicorn/no-array-reduce
const { composableNames, eventHandlerNames } = eventHandlerNamesLists.flat().reduce(
  (acc, { composableNames, eventHandlerNames }) => {
    acc.composableNames.push(...composableNames)
    acc.eventHandlerNames.push(...eventHandlerNames)
    return acc
  },
  { composableNames: [], eventHandlerNames: [] },
)

await Promise.all(eventHandlerNames.map(eventHandlerName => generateDefaultStoreEventHandler(eventHandlerName)))
await Promise.all(composableNames.map(composableName => generateDefaultStoreComposable(composableName)))

await generateIndexFile(eventHandlerNames)
await generateIndexFile(eventHandlerNames, TARGET_DIRECTORY_EVENTS_DEFAULT_STORE)
await generateIndexFile(composableNames, TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE)
await generateIndexFile(composableNames, TARGET_DIRECTORY_COMPOSABLES_DEFAULT_STORE)
