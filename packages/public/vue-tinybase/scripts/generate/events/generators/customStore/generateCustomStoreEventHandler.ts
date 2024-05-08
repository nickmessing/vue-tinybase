import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import * as t from '@babel/types'

import { addImports } from '../../../utils/importsHandler.js'
import { TARGET_DIRECTORY_EVENTS_CUSTOM_STORE } from '../../constants.js'

import { createExport } from './utils/createExport.js'
import { getParameterNames } from './utils/getParameterNames.js'

import type { NodePath } from '@babel/traverse'

const generate = generateModule.default

const rulesToDisable = [
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unsafe-assignment',
]

export async function generateCustomStoreFunction(
  rootPath: NodePath<t.TSInterfaceDeclaration>,
  eventName: string,
  typeElement: t.TSMethodSignature,
) {
  const isChangeEvent = !eventName.startsWith('Did') && !eventName.startsWith('Will') && !eventName.startsWith('Start')

  const eventHandlerName = `on${eventName}${isChangeEvent ? 'Change' : ''}`

  const parameterNames = getParameterNames(typeElement)

  const exportNamedDeclaration = createExport(rootPath, eventName, eventHandlerName, typeElement, parameterNames)

  const file = t.file(addImports(rootPath, [exportNamedDeclaration], parameterNames.length > 0))

  for (const rule of rulesToDisable) {
    t.addComment(file, 'leading', ` eslint-disable ${rule} `, false)
  }

  const { code } = generate(file)

  const filePath = resolve(TARGET_DIRECTORY_EVENTS_CUSTOM_STORE, `${eventHandlerName}.ts`)
  await writeFile(filePath, code)

  return eventHandlerName
}
