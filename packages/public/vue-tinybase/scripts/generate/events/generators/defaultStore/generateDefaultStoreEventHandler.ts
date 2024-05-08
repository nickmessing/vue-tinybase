import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'
import * as t from '@babel/types'

import { TARGET_DIRECTORY_EVENTS_CUSTOM_STORE, TARGET_DIRECTORY_EVENTS_DEFAULT_STORE } from '../../constants.js'

const traverse = traverseModule.default
const generate = generateModule.default

export async function generateDefaultStoreEventHandler(eventHandlerName: string) {
  const filePath = resolve(TARGET_DIRECTORY_EVENTS_CUSTOM_STORE, `${eventHandlerName}.ts`)

  const definition = await readFile(filePath, { encoding: 'utf8' })

  const definitionAbstractSyntaxTree = parse(definition, {
    plugins: ['typescript'],
    sourceType: 'module',
  })

  traverse(definitionAbstractSyntaxTree, {
    Program(path) {
      path.node.body = [
        ...path.node.body.slice(0, -1),
        t.importDeclaration(
          [t.importSpecifier(t.identifier('useStore'), t.identifier('useStore'))],
          t.stringLiteral('../../../composables/useStore.js'),
        ),
        path.node.body.at(-1)!,
      ]
    },
    FunctionDeclaration(path) {
      if (!t.isTSTypeParameterDeclaration(path.node.typeParameters)) {
        return
      }
      path.node.params.shift()
      path.node.typeParameters.params.shift()
      if (path.node.typeParameters.params.length === 0) {
        path.node.typeParameters = null
      }
    },
    TSTypeReference(path) {
      if (!t.isIdentifier(path.node.typeName) || path.node.typeName.name !== 'Store') {
        return
      }

      path.replaceWith(t.tsTypeReference(t.identifier('DefaultStore')))
    },
    ImportSpecifier(path) {
      if (path.node.local.name !== 'AnyStore') {
        return
      }

      path.replaceWith(t.importSpecifier(t.identifier('DefaultStore'), t.identifier('DefaultStore')))
    },
    CallExpression(path) {
      if (!t.isIdentifier(path.node.callee) || path.node.callee.name !== 'useListener') {
        return
      }

      path.get('arguments')[0].replaceWith(t.callExpression(t.identifier('useStore'), []))
    },
  })

  const { code } = generate(definitionAbstractSyntaxTree)

  const outputFilePath = resolve(TARGET_DIRECTORY_EVENTS_DEFAULT_STORE, `${eventHandlerName}.ts`)
  await writeFile(outputFilePath, code)
}
