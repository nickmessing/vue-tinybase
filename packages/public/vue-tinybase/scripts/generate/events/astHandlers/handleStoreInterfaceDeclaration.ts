import * as t from '@babel/types'

import { generateCustomStoreFunction } from '../generators/customStore/generateCustomStoreEventHandler.js'

import type { NodePath } from '@babel/traverse'
import type { TSInterfaceDeclaration } from '@babel/types'

export async function handleStoreInterfaceDeclaration(path: NodePath<TSInterfaceDeclaration>) {
  const promisesToWait = [] as Promise<string>[]

  for (const typeElement of path.node.body.body) {
    if (!t.isTSMethodSignature(typeElement)) {
      continue
    }

    const keyElement = typeElement.key
    if (!t.isIdentifier(keyElement)) {
      continue
    }

    const key = keyElement.name

    if (!key.startsWith('add') || !key.endsWith('Listener')) {
      continue
    }

    const eventName = key.slice(3, -8)

    promisesToWait.push(generateCustomStoreFunction(path, eventName, typeElement))
  }

  return await Promise.all(promisesToWait)
}
