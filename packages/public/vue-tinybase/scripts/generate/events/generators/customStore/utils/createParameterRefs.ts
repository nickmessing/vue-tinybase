import * as t from '@babel/types'

export function createParameterRefs(parameterNames: string[]) {
  return parameterNames.map(parameterName =>
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(`${parameterName}Ref`),
        t.tsAsExpression(t.callExpression(t.identifier('toRef'), [t.identifier(parameterName)]), t.tsAnyKeyword()),
      ),
    ]),
  )
}
