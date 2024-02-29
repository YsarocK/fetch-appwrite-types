import {create, DeclarationFlags, type} from 'dts-dom';
import type { Attribute } from '../types/Attribute.js';
/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */

const findType = (attribute: Attribute) => {

  // handle null values
  if (attribute.type === null) {
    return create.property(attribute.key, type.null, attribute.required === false && DeclarationFlags.Optional)
  }

  // handle strings
  if (attribute.type === 'string') {
    if(attribute.format === 'enum') {
      //
    }
    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional)
  }

  // handle arrays
  if (attribute.array === true) {
    return create.property(attribute.key, type.array(type.any), attribute.required === false && DeclarationFlags.Optional)
  }

  // handle email
  if (attribute.format && attribute.format === 'email') {
    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional)
  }

  // handle integer & double
  if (attribute.type === 'integer' || attribute.type === 'double') {
    return create.property(attribute.key, type.number, attribute.required === false && DeclarationFlags.Optional)
  }

  // handle boolean
  if (attribute.type === 'boolean') {
    return create.property(attribute.key, type.boolean, attribute.required === false && DeclarationFlags.Optional)
  }

  return create.property(attribute.key, type.any, attribute.required === false && DeclarationFlags.Optional)
};

export default findType;
