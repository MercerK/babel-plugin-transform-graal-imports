import type { PluginOptions } from '@babel/helper-module-transforms'
import { visitor } from './visitor'

export interface Options extends PluginOptions {
  objectName?: string
  propertyName?: string
}

export default function declare(api, options: Options) {
  const { objectName = 'Java', propertyName = 'type' } = options

  return {
    name: 'babel-plugin-transform-graal-imports',
    visitor: visitor(api.t, objectName, propertyName),
  }
}
