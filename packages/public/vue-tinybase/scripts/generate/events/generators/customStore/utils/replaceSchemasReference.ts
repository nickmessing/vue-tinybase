import traverseModule from '@babel/traverse'
import * as t from '@babel/types'

import type { NodePath } from '@babel/traverse'

const traverse = traverseModule.default

export function replaceSchemasReference<T extends t.Node>(rootPath: NodePath<t.TSInterfaceDeclaration>, node: T): T {
  const clonedNode = t.cloneNode(node, true)
  traverse(
    clonedNode,
    {
      TSTypeReference(path) {
        const typeName = path.node.typeName

        if (!t.isIdentifier(typeName) || typeName.name !== 'Schemas') {
          return
        }

        path.replaceWith(
          t.tsTypeReference(
            t.identifier('ExtractSchemasFromStore'),
            t.tsTypeParameterInstantiation([t.tsTypeReference(t.identifier('Store'))]),
          ),
        )
      },
    },
    rootPath.scope,
    undefined,
    rootPath,
  )

  return clonedNode
}
