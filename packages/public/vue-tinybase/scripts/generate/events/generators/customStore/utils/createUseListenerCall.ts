import * as t from '@babel/types'

export function createUseListenerCall(eventName: string, parameterNames: string[]) {
  return t.callExpression(t.identifier('useListener'), [
    t.identifier('store'),
    t.arrowFunctionExpression(
      [t.identifier('store')],
      t.callExpression(t.memberExpression(t.identifier('store'), t.identifier(`add${eventName}Listener`)), [
        ...parameterNames.map(parameterName =>
          t.memberExpression(t.identifier(`${parameterName}Ref`), t.identifier('value')),
        ),
        t.tsAsExpression(t.identifier('listener'), t.tsAnyKeyword()),
      ]),
    ),
    t.arrayExpression(parameterNames.map(parameterName => t.identifier(`${parameterName}Ref`))),
    t.identifier('options'),
  ])
}
