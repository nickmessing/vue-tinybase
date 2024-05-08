import * as t from '@babel/types'

export function generateTypeParameters(signature: t.TSMethodSignature) {
  const typeParameters = signature.typeParameters
    ? t.cloneNode(signature.typeParameters, true)
    : t.tsTypeParameterDeclaration([])

  typeParameters.params.unshift(t.tsTypeParameter(t.tsTypeReference(t.identifier('AnyStore')), undefined, 'Store'))

  return typeParameters
}
