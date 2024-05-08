import * as t from '@babel/types'

import { createParameterRefs } from '../../events/generators/customStore/utils/createParameterRefs.js'
import { createParameters } from '../../events/generators/customStore/utils/createParameters.js'

import type { NodePath } from '@babel/traverse'

export function generateComposableFunction(
  rootPath: NodePath<t.TSInterfaceDeclaration>,
  typeParameters: t.TSTypeParameterDeclaration,
  signature: t.TSMethodSignature,
  fieldName: string,
  parameterNames: string[],
) {
  const storeIdentifier = t.identifier('store')
  storeIdentifier.typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier('Store')))

  const statements: t.Statement[] = createParameterRefs(parameterNames)

  const isRefActiveStatement = t.variableDeclaration('let', [
    t.variableDeclarator(t.identifier('isRefActive'), t.booleanLiteral(false)),
  ])
  const localRefStatement = t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier('localRef'), t.callExpression(t.identifier('shallowRef'), [])),
  ])
  const getDataFromStoreStatement = t.functionDeclaration(
    t.identifier('getDataFromStore'),
    [],
    t.blockStatement([
      t.returnStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(t.identifier('localRef'), t.identifier('value')),
          t.callExpression(
            t.memberExpression(t.identifier('store'), t.identifier(`get${fieldName}`)),
            parameterNames.map(parameterName =>
              t.memberExpression(t.identifier(`${parameterName}Ref`), t.identifier('value')),
            ),
          ),
        ),
      ),
    ]),
  )
  const eventListenerCallStatement = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.objectPattern([t.objectProperty(t.identifier('startListening'), t.identifier('startListening'))]),
      t.callExpression(t.identifier(`on${fieldName}Change`), [
        t.identifier('store'),
        ...parameterNames.map(parameterName => t.identifier(`${parameterName}Ref`)),
        t.identifier('getDataFromStore'),
        t.objectExpression([t.objectProperty(t.identifier('immediate'), t.booleanLiteral(false))]),
      ]),
    ),
  ])
  const dataComputedStatement = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('data'),
      t.callExpression(t.identifier('computed'), [
        t.arrowFunctionExpression(
          [],
          t.blockStatement([
            t.ifStatement(
              t.unaryExpression('!', t.identifier('isRefActive')),
              t.blockStatement([
                t.expressionStatement(t.callExpression(t.identifier('getDataFromStore'), [])),
                t.expressionStatement(t.assignmentExpression('=', t.identifier('isRefActive'), t.booleanLiteral(true))),
                t.expressionStatement(t.callExpression(t.identifier('startListening'), [])),
              ]),
            ),
            t.returnStatement(t.memberExpression(t.identifier('localRef'), t.identifier('value'))),
          ]),
        ),
      ]),
    ),
  ])

  const watchStatement = t.expressionStatement(
    t.callExpression(t.identifier('watch'), [
      t.arrayExpression(parameterNames.map(parameterName => t.identifier(`${parameterName}Ref`))),
      t.identifier('getDataFromStore'),
    ]),
  )

  const returnStatement = t.returnStatement(
    t.objectExpression([t.objectProperty(t.identifier('data'), t.identifier('data'))]),
  )

  statements.push(
    isRefActiveStatement,
    localRefStatement,
    getDataFromStoreStatement,
    eventListenerCallStatement,
    dataComputedStatement,
  )
  if (parameterNames.length > 0) {
    statements.push(watchStatement)
  }
  statements.push(returnStatement)

  const functionDeclaration = t.functionDeclaration(
    t.identifier(`use${fieldName}`),
    createParameters(rootPath, signature, false),
    t.blockStatement(statements),
  )

  functionDeclaration.typeParameters = typeParameters

  functionDeclaration.returnType = t.tsTypeAnnotation(
    t.tsTypeReference(
      t.identifier(`Use${fieldName}Result`),
      t.tsTypeParameterInstantiation(typeParameters.params.map(param => t.tsTypeReference(t.identifier(param.name)))),
    ),
  )

  return t.exportNamedDeclaration(functionDeclaration)
}
