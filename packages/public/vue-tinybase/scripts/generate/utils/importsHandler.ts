import traverseModule from '@babel/traverse'
import * as t from '@babel/types'

import type { NodePath } from '@babel/traverse'

const traverse = traverseModule.default

const tinybaseCommonTypes = new Set(['IdOrNull', 'Id', 'Ids'])
const vueTinybaseTypes = new Set(['AnyStore', 'ExtractSchemasFromStore'])
const vueReactivityTypes = new Set(['MaybeRefOrGetter', 'ComputedRef'])
const tinybaseInternalTypes = new Set([
  'AllCellIdFromSchema',
  'CellIdFromSchema',
  'TableIdFromSchema',
  'ValueIdFromSchema',
  'DefaultedValueFromSchema',
])
const useListenerTypes = new Set(['UseListenerOptions'])

export function addImports(
  rootPath: NodePath<t.TSInterfaceDeclaration>,
  statements: t.Statement[],
  isToRefUsed = true,
  isUseListenerUsed = true,
  isShallowRefUsed = false,
  isComputedUsed = false,
  eventListenerToImport?: string,
) {
  const program = t.program([...statements])

  if (isToRefUsed || isShallowRefUsed || isComputedUsed) {
    program.body.unshift(
      t.importDeclaration(
        [
          ...(isToRefUsed ? [t.importSpecifier(t.identifier('toRef'), t.identifier('toRef'))] : []),
          ...(isShallowRefUsed ? [t.importSpecifier(t.identifier('shallowRef'), t.identifier('shallowRef'))] : []),
          ...(isComputedUsed ? [t.importSpecifier(t.identifier('computed'), t.identifier('computed'))] : []),
        ],
        t.stringLiteral('@vue/reactivity'),
      ),
    )
  }

  if (isUseListenerUsed) {
    program.body.unshift(
      t.importDeclaration(
        [t.importSpecifier(t.identifier('useListener'), t.identifier('useListener'))],
        t.stringLiteral('../../../utils/useListener.js'),
      ),
    )
  }

  if (eventListenerToImport) {
    program.body.unshift(
      t.importDeclaration(
        [t.importSpecifier(t.identifier(eventListenerToImport), t.identifier(eventListenerToImport))],
        t.stringLiteral(`../../events/custom-store/${eventListenerToImport}.js`),
      ),
    )
  }

  const locallyDefinedTypes = new Set<string>()

  const typesToImport = {
    tinybase: new Set<string>(),
    tinybaseCommon: new Set<string>(),
    tinybaseInternal: new Set<string>(),
    vueTinybase: new Set<string>(),
    vueReactivity: new Set<string>(),
    useListener: new Set<string>(),
  }

  function addTypeImportDeclaration(types: Set<string>, source: string) {
    const typesToImport = [...types].filter(typeName => !locallyDefinedTypes.has(typeName))

    if (typesToImport.length === 0) {
      return
    }

    const importDeclaration = t.importDeclaration(
      typesToImport.map(typeName => t.importSpecifier(t.identifier(typeName), t.identifier(typeName))),
      t.stringLiteral(source),
    )

    importDeclaration.importKind = 'type'

    program.body.unshift(importDeclaration)
  }

  function addTypeToImport(typeName: string) {
    if (vueTinybaseTypes.has(typeName)) {
      return typesToImport.vueTinybase.add(typeName)
    }

    if (tinybaseInternalTypes.has(typeName)) {
      return typesToImport.tinybaseInternal.add(typeName)
    }

    if (tinybaseCommonTypes.has(typeName)) {
      return typesToImport.tinybaseCommon.add(typeName)
    }

    if (vueReactivityTypes.has(typeName)) {
      return typesToImport.vueReactivity.add(typeName)
    }

    if (useListenerTypes.has(typeName)) {
      return typesToImport.useListener.add(typeName)
    }

    typesToImport.tinybase.add(typeName)
  }

  for (const statement of statements) {
    traverse(
      statement,
      {
        TSTypeParameter(path) {
          locallyDefinedTypes.add(path.node.name)
        },
        TSTypeAliasDeclaration(path) {
          locallyDefinedTypes.add(path.node.id.name)
        },
        TSTypeReference(path) {
          const typeName = path.node.typeName

          if (!t.isIdentifier(typeName)) {
            return
          }

          addTypeToImport(typeName.name)
        },
      },
      rootPath.scope,
      undefined,
      rootPath,
    )
  }

  addTypeImportDeclaration(typesToImport.tinybase, 'tinybase/with-schemas/store')
  addTypeImportDeclaration(typesToImport.tinybaseCommon, 'tinybase/with-schemas/common')
  addTypeImportDeclaration(typesToImport.tinybaseInternal, 'tinybase/with-schemas/internal/store')
  addTypeImportDeclaration(typesToImport.vueTinybase, '../../../types.js')
  addTypeImportDeclaration(typesToImport.vueReactivity, '@vue/reactivity')
  addTypeImportDeclaration(typesToImport.useListener, '../../../utils/useListener.js')

  return program
}
