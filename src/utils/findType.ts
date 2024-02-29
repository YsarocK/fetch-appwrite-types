import { create, DeclarationFlags, emit, type } from 'dts-dom';
import type { Attribute } from '../types/Attribute.js';
import {createWriteStream} from "fs";
/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */

const findType = (attribute: Attribute, outDir: string, intfName: string) => {
  const writeStream = createWriteStream(`${outDir}/appwrite.ts`, { flags: 'a' });

  // handle null values
  if (attribute.type === null) {
    return create.property(attribute.key, type.null, attribute.required === false && DeclarationFlags.Optional);
  }

  if(attribute.format === 'enum') {
    const EnumName = `${intfName}_${attribute.key}`;
    const EnumType = create.enum(EnumName, false, DeclarationFlags.Export);

    attribute.elements.forEach((element: string) => {
      EnumType.members.push(create.enumValue(element, element));
    });
    writeStream.write(emit(EnumType));

    return create.property(attribute.key, create.namedTypeReference(EnumName), attribute.required === false && DeclarationFlags.Optional);
  }

  // handle strings
  if (attribute.type === 'string') {
    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle arrays
  if (attribute.array === true) {
    return create.property(attribute.key, type.array(type.any), attribute.required === false && DeclarationFlags.Optional);
  }

  // handle email
  if (attribute.format && attribute.format === 'email') {
    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle integer & double
  if (attribute.type === 'integer' || attribute.type === 'double') {
    return create.property(attribute.key, type.number, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle boolean
  if (attribute.type === 'boolean') {
    return create.property(attribute.key, type.boolean, attribute.required === false && DeclarationFlags.Optional);
  }

  return create.property(attribute.key, type.any, attribute.required === false && DeclarationFlags.Optional);
};

export default findType;
