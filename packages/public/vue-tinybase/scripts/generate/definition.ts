import { parse } from '@babel/parser'
import fetch from 'node-fetch'

import { STORE_DEFINITION_URL } from './constants.js'

async function getStoreDefinition() {
  const result = await fetch(STORE_DEFINITION_URL)
  return result.text()
}

const definition = await getStoreDefinition()

export const definitionAbstractSyntaxTree = parse(definition, {
  plugins: ['typescript'],
  sourceType: 'module',
})
