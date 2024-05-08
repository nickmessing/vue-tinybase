import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'
import * as t from '@babel/types'

import {
  TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE,
  TARGET_DIRECTORY_COMPOSABLES_DEFAULT_STORE,
} from '../../../composables/constants.js'

const traverse = traverseModule.default
const generate = generateModule.default

export async function generateDefaultStoreComposable(composableName: string) {
  const filePath = resolve(TARGET_DIRECTORY_COMPOSABLES_CUSTOM_STORE, `${composableName}.ts`)

  const definition = await readFile(filePath, { encoding: 'utf8' })

  const definitionAbstractSyntaxTree = parse(definition, {
    plugins: ['typescript'],
    sourceType: 'module',
  })

  traverse(definitionAbstractSyntaxTree, {
    Program(path) {
      path.node.body = [
        ...path.node.body.slice(0, -2),
        t.importDeclaration(
          [t.importSpecifier(t.identifier(`${composableName}CustomStore`), t.identifier(composableName))],
          t.stringLiteral(`../custom-store/${composableName}.js`),
        ),
        t.importDeclaration(
          [t.importSpecifier(t.identifier('useStore'), t.identifier('useStore'))],
          t.stringLiteral('../../../composables/useStore.js'),
        ),
        ...path.node.body.slice(-2),
      ]
    },
    TSTypeParameterDeclaration(path) {
      path.node.params.shift()
      if (path.node.params.length === 0) {
        path.remove()
      }
    },
    FunctionDeclaration(path) {
      if (
        !t.isTSTypeParameterDeclaration(path.node.typeParameters) ||
        !t.isIdentifier(path.node.id) ||
        path.node.id.name !== composableName
      ) {
        return
      }
      path.node.params.shift()

      const useStoreStatement = t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier('store'), t.callExpression(t.identifier('useStore'), [])),
      ])
      const returnStatement = t.returnStatement(
        t.callExpression(t.identifier(`${composableName}CustomStore`), [
          t.identifier('store'),
          ...path.node.params.map(param => t.identifier(t.isIdentifier(param) ? param.name : '')),
        ]),
      )

      path.node.body = t.blockStatement([useStoreStatement, returnStatement])
    },
    TSTypeReference(path) {
      if (t.isIdentifier(path.node.typeName) && path.node.typeName.name === 'Store') {
        path.replaceWith(t.tsTypeReference(t.identifier('DefaultStore')))
      }

      if (
        t.isIdentifier(path.node.typeName) &&
        path.node.typeName.name.startsWith('Use') &&
        path.node.typeName.name.endsWith('Result') &&
        path.node.typeParameters
      ) {
        path.node.typeParameters.params.shift()
        if (path.node.typeParameters.params.length === 0) {
          path.node.typeParameters = null
        }
      }
    },
    ImportSpecifier(path) {
      if (path.node.local.name !== 'AnyStore') {
        return
      }

      path.replaceWith(t.importSpecifier(t.identifier('DefaultStore'), t.identifier('DefaultStore')))
    },
  })

  const { code } = generate(definitionAbstractSyntaxTree)

  const outputFilePath = resolve(TARGET_DIRECTORY_COMPOSABLES_DEFAULT_STORE, `${composableName}.ts`)
  await writeFile(outputFilePath, code)
}
