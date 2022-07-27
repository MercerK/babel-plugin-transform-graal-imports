<h1 align="center">Babel Plugin Transform Graal Imports</h1>

<p align="center">A babel plugin transformer for GraalVM imports.</p>

Be able to use `import { Map } from 'java.util'` instead of `const Map = Java.type('java.util.Map')`

# How does it work

Using Babel, we can look for certain patterns in the `Import` statement and convert those into `Java.type`.

`import { Map, Array } from 'java.util'`

becomes

```
const Map = Java.type('java.util.Map');
const Array = Java.type('java.util.Array');
```

# Getting Started

##### Add this plugin to your repository:

`npm install --dev babel-plugin-transform-graal-imports`

##### Include the plugin in the your babel config (.babelrc)

```json
{
  "presets": [
    ...
  ],
  "plugins": [
    ...
    "babel-plugin-transform-graal-imports"
  ]
}
```

You can add additional options as well!

```json
{
  "presets": [
    ...
  ],
  "plugins": [
    ...
    ["babel-plugin-transform-graal-imports", {
      "objectName": "core",
      "propertyName": "type"
    }]
  ]
}
```

This will change `Java.type` to `core.type`.

##### Build

Make sure to add the type definitions, add the imports, and build away!

# Background

[GraalVM](https://www.graalvm.org/) is a JDK distribution written in Java and other JVM languages along with support for
JavaScript, Ruby, Python, etc. This allows you to write JavaScript code in order to access Java classes during runtime.

Depending on the configuration of the GraalVM environment, you may be limited to only accessing those Java classes by
using `Java.type('java.util.Map')`. While it does function, type definitions become a bit of a challenge. If you wanted
to extend the type definitions with additional classes for other Java dependencies, you'll need to import the primary
module, extend it, perform black magic, repeat for each instance, and pray it works. It is painful, but it does build
character!

This plugin was created to solve a problem within the [Grakkit](https://github.com/grakkit/grakkit) ecosystem. Grakkit
is a Minecraft Java Plugin that leverages GraalVM, which allows existing JavaScript developers to learn Minecraft Plugin
development without having to drink Java.

One of the original developers wrote a JavaDoc parser. This allowed Grakkit developers to leverage intellisense for the
first time when working with Java classes while writing JavaScript code. Unfortunately, the type definitions became a
bit of a struggle.

In early 2022, folks discovered another GraalVM implementation within Minecraft called
[CraftJS](https://github.com/Dysfold/craftjs) and they were able to overcome the typing problem using a tool they
created called [java-ts-bind](https://github.com/bensku/java-ts-bind). However, Grakkit doesn't operate in the same
fashion as CraftJS, so we couldn't do the `import { Map } from 'java.util'`; we needed to do
`core.type('java.util.Map')`. **Note**: `core.type` is a wrapper around `Java.type`.

After a little inspiration and experimenting, we ended up creating this plugin!

## Misc

Feel free to come join us in the [Grakkit Discord](https://discord.gg/e682hwR)!
