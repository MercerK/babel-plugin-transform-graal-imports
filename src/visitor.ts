import { BabelTypes } from './types'
import type { NodePath } from '@babel/traverse'

const JAVA_PREFIXES = ['java.', 'com.', 'co.', 'org.', 'net.', 'me.', 'io.']

export const visitor = (t: BabelTypes, objectName = 'Java', propertyName = 'type') => ({
  ImportDeclaration(path: NodePath<any>) {
    const source: string = path.node.source.value
    const identifiers: string[] = path.node.specifiers.map((item) => item.local.name)

    if (!JAVA_PREFIXES.some((item) => source.startsWith(item))) return

    path.replaceWithMultiple(
      identifiers.map((item) =>
        t.variableDeclaration('const', [
          t.variableDeclarator(
            t.identifier(item),
            t.callExpression(t.memberExpression(t.identifier(objectName), t.identifier(propertyName)), [
              t.stringLiteral(`${source}.${item}`),
            ])
          ),
        ])
      )
    )
  },
})
