import { transformSync, types as t } from '@babel/core'
import { visitor } from './visitor'

describe('transforms', () => {
  const transform = (code: string, obj?: string, prop?: string) =>
    transformSync(code, {
      plugins: [
        function myCustomPlugin() {
          return {
            visitor: visitor(t, obj, prop),
          }
        },
      ],
    })?.code

  const createTest = (name: string, input: string, output: string, obj?: string, prop?: string) => {
    it(name, () => {
      expect(transform(input, obj, prop)).toBe(output)
    })
  }

  const Import = (imports: string) => `import { ${imports} } from 'java.util'`
  const ImportMap = Import('Map')
  const TranspiledMap = `const Map = Java.type(\"java.util.Map\");`
  const TranspiledArray = `const Array = Java.type(\"java.util.Array\");`

  createTest('transforms single java import', ImportMap, TranspiledMap)

  createTest('transforms multiple java imports', Import('Map, Array'), TranspiledMap + '\n' + TranspiledArray)

  createTest(
    'leaves other imports alone',
    "import visitor from './visitor.ts'\n" + Import('Map, Array'),
    "import visitor from './visitor.ts';\n" + TranspiledMap + '\n' + TranspiledArray
  )

  createTest(
    'supports objectName & propertyName changes',
    ImportMap,
    `const Map = foo.bar(\"java.util.Map\");`,
    'foo',
    'bar'
  )
})
