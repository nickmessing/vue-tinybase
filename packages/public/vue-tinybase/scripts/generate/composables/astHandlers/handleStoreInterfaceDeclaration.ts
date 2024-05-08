import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import * as t from '@babel/types'

import { getParameterNames } from '../../events/generators/customStore/utils/getParameterNames.js'
import { replaceSchemasReference } from '../../events/generators/customStore/utils/replaceSchemasReference.js'
import { addImports } from '../../utils/importsHandler.js'
import { TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE } from '../constants.js'
import { generateComposable } from '../generators/generateComposable.js'

import type { NodePath } from '@babel/traverse'

const generate = generateModule.default

const rulesToDisable = [
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unsafe-assignment',
  '@typescript-eslint/no-unused-vars',
  '@typescript-eslint/no-unsafe-return',
]

export async function handleStoreInterfaceDeclaration(path: NodePath<t.TSInterfaceDeclaration>) {
  const methodSignatures = {} as Record<string, t.TSMethodSignature>

  const composableNames: string[] = []

  for (const bodyElement of path.node.body.body) {
    if (!t.isTSMethodSignature(bodyElement) || !t.isIdentifier(bodyElement.key)) {
      continue
    }

    methodSignatures[bodyElement.key.name] = bodyElement
  }

  for (const methodSignatureName in methodSignatures) {
    if (!methodSignatureName.startsWith('get')) {
      continue
    }

    const fieldName = methodSignatureName.slice(3)

    if (!methodSignatures[`add${fieldName}Listener`]) {
      continue
    }

    const signature = methodSignatures[methodSignatureName]

    const parameterNames = getParameterNames(signature)

    const statements = generateComposable(path, methodSignatures, signature, fieldName, parameterNames).map(statement =>
      replaceSchemasReference(path, statement),
    )

    const file = t.file(
      addImports(
        path,
        statements,
        parameterNames.length > 0,
        false,
        true,
        true,
        parameterNames.length > 0,
        `on${fieldName}Change`,
      ),
    )
    for (const rule of rulesToDisable) {
      t.addComment(file, 'leading', ` eslint-disable ${rule} `, false)
    }

    const { code } = generate(file)

    const filePath = resolve(TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE, `use${fieldName}.ts`)
    await writeFile(filePath, code)

    composableNames.push(`use${fieldName}`)
  }

  return composableNames
}
