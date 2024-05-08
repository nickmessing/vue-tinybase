import * as t from '@babel/types'

import { replaceSchemasReference } from './replaceSchemasReference.js'

import type { NodePath } from '@babel/traverse'

export function createTypeParameters(rootPath: NodePath<t.TSInterfaceDeclaration>, typeElement: t.TSMethodSignature) {
  const typeParameters = typeElement.typeParameters
    ? t.cloneNode(typeElement.typeParameters, true)
    : t.tsTypeParameterDeclaration([])

  typeParameters.params.unshift(t.tsTypeParameter(t.tsTypeReference(t.identifier('AnyStore')), undefined, 'Store'))

  return replaceSchemasReference(rootPath, typeParameters)
}
