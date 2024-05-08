import * as t from '@babel/types'

import { createParameterRefs } from './createParameterRefs.js'
import { createParameters } from './createParameters.js'
import { createTypeParameters } from './createTypeParameters.js'
import { createUseListenerCall } from './createUseListenerCall.js'

import type { NodePath } from '@babel/traverse'

export function createExport(
  rootPath: NodePath<t.TSInterfaceDeclaration>,
  eventName: string,
  eventHandlerName: string,
  typeElement: t.TSMethodSignature,
  parameterNames: string[],
) {
  const functionDeclaration = t.functionDeclaration(
    t.identifier(eventHandlerName),
    createParameters(rootPath, typeElement),
    t.blockStatement([
      ...createParameterRefs(parameterNames),
      t.returnStatement(createUseListenerCall(eventName, parameterNames)),
    ]),
  )

  functionDeclaration.typeParameters = createTypeParameters(rootPath, typeElement)

  return t.exportNamedDeclaration(functionDeclaration)
}
