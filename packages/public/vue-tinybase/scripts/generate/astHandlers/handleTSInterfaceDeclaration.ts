import { handleStoreInterfaceDeclaration } from './handleStoreInterfaceDeclaration.js'

import type { NodePath } from '@babel/traverse'
import type { TSInterfaceDeclaration } from '@babel/types'

export async function handleTSInterfaceDeclaration(path: NodePath<TSInterfaceDeclaration>) {
  if (path.node.id.name === 'Store') {
    return handleStoreInterfaceDeclaration(path)
  }

  return {
    composableNames: [],
    eventHandlerNames: [],
  }
}
