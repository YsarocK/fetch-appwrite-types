import { type } from 'dts-dom';
import type { Attribute } from '../types/Attribute.js';
import appendType from './appendType.js';

/**
 * 
 * Add the type of the value to the types file when Email or URL is detected
 * @param attribute The attribute to find the type of
 * @param filePath The path to the types file 
 * @returns The type (dts-dom) of the value
 */

const findAndAddType = async (attribute: Attribute, filePath: string) => {
  // handle null values
  if (attribute.type === null) {
    return type.null
  }

  // handle strings
  if (attribute.type === 'string') {
    // handle email
    if (attribute.format) {
      switch (attribute.format) {
        case 'email':
          await appendType('Email', filePath)
          break;
        case "url":
          await appendType('URL', filePath)
          break;
      }
    }
    return type.string
  }

  // handle arrays
  if (attribute.array === true) {
    return type.array(type.any)
  }

  // handle integer & double
  if (attribute.type === 'integer' || attribute.type === 'double') {
    return type.number
  }

  // handle boolean
  if (attribute.type === 'boolean') {
    return type.boolean
  }

  return type.any
}

export default findAndAddType;