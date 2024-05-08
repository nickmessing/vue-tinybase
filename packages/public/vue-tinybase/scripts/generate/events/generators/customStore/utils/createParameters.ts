import * as t from '@babel/types'

import { replaceSchemasReference } from './replaceSchemasReference.js'

import type { NodePath } from '@babel/traverse'

export function createParameters(
  rootPath: NodePath<t.TSInterfaceDeclaration>,
  typeElement: t.TSMethodSignature,
  includeOptionsParameter = true,
) {
  const storeParameter = t.identifier('store')
  storeParameter.typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier('Store')))

  const optionsParameter = t.identifier('options')
  optionsParameter.optional = true
  optionsParameter.typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier('UseListenerOptions')))

  return [
    storeParameter,
    ...typeElement.parameters
      .filter(parameter => !t.isIdentifier(parameter) || parameter.name !== 'mutator')
      .map(parameter => {
        if (
          !t.isIdentifier(parameter) ||
          parameter.name === 'listener' ||
          !t.isTSTypeAnnotation(parameter.typeAnnotation)
        ) {
          return parameter
        }

        const clonedParameter = t.cloneNode(parameter, true)

        if (!t.isTSTypeAnnotation(clonedParameter.typeAnnotation)) {
          return parameter
        }

        clonedParameter.typeAnnotation.typeAnnotation = t.tsTypeReference(
          t.identifier('MaybeRefOrGetter'),
          t.tsTypeParameterInstantiation([parameter.typeAnnotation.typeAnnotation]),
        )

        return clonedParameter
      })
      .map(parameter => replaceSchemasReference(rootPath, parameter)),
    ...(includeOptionsParameter ? [optionsParameter] : []),
  ]
}
