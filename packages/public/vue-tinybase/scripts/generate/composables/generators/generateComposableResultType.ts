import * as t from '@babel/types'

export function generateComposableResultType(
  typeParameters: t.TSTypeParameterDeclaration,
  signature: t.TSMethodSignature,
  fieldName: string,
) {
  if (!t.isTSTypeAnnotation(signature.typeAnnotation)) {
    throw new Error('Expected type annotation')
  }

  const typeExport = t.exportNamedDeclaration(
    t.tsTypeAliasDeclaration(
      t.identifier(`Use${fieldName}Result`),
      typeParameters,
      t.tsTypeLiteral([
        t.tsPropertySignature(
          t.identifier('data'),
          t.tsTypeAnnotation(
            t.tsTypeReference(
              t.identifier('ComputedRef'),
              t.tsTypeParameterInstantiation([signature.typeAnnotation.typeAnnotation]),
            ),
          ),
        ),
      ]),
    ),
  )

  return typeExport
}
