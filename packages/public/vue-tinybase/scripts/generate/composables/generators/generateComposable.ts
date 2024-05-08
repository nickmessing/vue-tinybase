import { generateComposableFunction } from './generateComposableFunction.js'
import { generateComposableResultType } from './generateComposableResultType.js'
import { generateTypeParameters } from './generateTypeParameters.js'

import type { NodePath } from '@babel/traverse'
import type * as t from '@babel/types'

export function generateComposable(
  rootPath: NodePath<t.TSInterfaceDeclaration>,
  methodSignatures: Record<string, t.TSMethodSignature>,
  signature: t.TSMethodSignature,
  fieldName: string,
  parameterNames: string[],
) {
  const typeParameters = generateTypeParameters(signature)

  const typeExport = generateComposableResultType(typeParameters, signature, fieldName)
  const functionExport = generateComposableFunction(rootPath, typeParameters, signature, fieldName, parameterNames)
  return [typeExport, functionExport]
}
