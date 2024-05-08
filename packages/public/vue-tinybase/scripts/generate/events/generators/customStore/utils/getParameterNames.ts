import * as t from '@babel/types'

export function getParameterNames(typeElement: t.TSMethodSignature) {
  const parameterNames = [] as string[]

  for (const parameter of typeElement.parameters) {
    if (!t.isIdentifier(parameter) || parameter.name === 'listener' || parameter.name === 'mutator') {
      continue
    }

    parameterNames.push(parameter.name)
  }

  return parameterNames
}
