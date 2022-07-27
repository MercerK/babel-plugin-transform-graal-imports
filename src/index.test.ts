import plugin from './index'
import pluginTester from 'babel-plugin-tester'

pluginTester({
  plugin,
  tests: {
    'works OOTB': {
      code: `import { Map } from 'java.util'`,
      output: `const Map = Java.type('java.util.Map')`,
    },
  },
})

pluginTester({
  plugin,
  pluginOptions: {
    objectName: 'core',
  },
  tests: {
    'works OOTB': {
      code: `import { Map } from 'java.util'`,
      output: `const Map = core.type('java.util.Map')`,
    },
  },
})

pluginTester({
  plugin,
  pluginOptions: {
    objectName: 'foo',
    propertyName: 'bar',
  },
  tests: {
    'works OOTB': {
      code: `import { Map } from 'java.util'`,
      output: `const Map = foo.bar('java.util.Map')`,
    },
  },
})
