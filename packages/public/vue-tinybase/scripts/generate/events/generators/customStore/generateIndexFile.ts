import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import * as t from '@babel/types'

import { TARGET_DIRECTORY_EVENTS_CUSTOM_STORE } from '../../constants.js'

const generate = generateModule.default

export async function generateIndexFile(eventHandlerNames: string[], directory = TARGET_DIRECTORY_EVENTS_CUSTOM_STORE) {
  const statements = eventHandlerNames.map(eventHandlerName =>
    t.exportNamedDeclaration(
      undefined,
      [t.exportSpecifier(t.identifier(eventHandlerName), t.identifier(eventHandlerName))],
      t.stringLiteral(`./${eventHandlerName}.js`),
    ),
  )

  const file = t.file(t.program(statements))

  const { code } = generate(file)

  const filePath = resolve(directory, `index.ts`)
  await writeFile(filePath, code)
}
