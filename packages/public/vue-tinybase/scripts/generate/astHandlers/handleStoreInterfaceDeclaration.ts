import { handleStoreInterfaceDeclaration as handleStoreInterfaceDeclarationForComposables } from '../composables/astHandlers/handleStoreInterfaceDeclaration.js'
import { handleStoreInterfaceDeclaration as handleStoreInterfaceDeclarationForEvents } from '../events/astHandlers/handleStoreInterfaceDeclaration.js'

import type { NodePath } from '@babel/traverse'
import type { TSInterfaceDeclaration } from '@babel/types'

export async function handleStoreInterfaceDeclaration(path: NodePath<TSInterfaceDeclaration>) {
  return {
    composableNames: await handleStoreInterfaceDeclarationForComposables(path),
    eventHandlerNames: await handleStoreInterfaceDeclarationForEvents(path),
  }
}
