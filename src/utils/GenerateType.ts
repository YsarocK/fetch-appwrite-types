import { ArrayTypeReference, create, DeclarationFlags, emit, NamedTypeReference, type } from 'dts-dom';
import type { Attribute } from '../types/index.js';
import { createWriteStream } from "fs";
import { databasesClient } from "../utils/appwrite.js";
import FormatCollectionName from './FormatCollectionName.js';
/**
 *
 * @param attribute The attribute to find the type of
 * @param outDir The directory to output the types to
 * @param typeIntfName The name of the interface
 * @returns The type (dts-dom) of the value
 */

interface registerRelationship {
  (params: {
    key: string,
    value: NamedTypeReference | ArrayTypeReference,
    required: boolean
  }): void;
}

const GenerateType = async (attribute: Attribute, outDir: string, typeIntfName: string, hardTypes: boolean, includeDBName: boolean, dbName: string, dbId: string, registerRelationship: registerRelationship) => {
  const writeStream = createWriteStream(`${outDir}/appwrite.ts`, { flags: 'a' });

  // handle null values
  if (attribute.type === null) {
    return create.property(attribute.key, type.null, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle date values
  if (attribute.type === "datetime") {
    if(hardTypes) {
      return create.property(attribute.key, create.namedTypeReference('Date'), attribute.required === false && DeclarationFlags.Optional);
    }

    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle related collections
  if(attribute.relatedCollection) {
    const result = await databasesClient.getCollection(
      dbId,
      attribute.relatedCollection
    );
    const isMany = (attribute.relationType.startsWith('manyToOne') && attribute.side === 'child') || (attribute.relationType === 'manyToMany') || ((attribute.relationType === 'oneToMany') && attribute.side === 'parent');
    const reference = {
      type: create.namedTypeReference(`${FormatCollectionName(includeDBName ? `${dbName}${result.name}` : result.name)}Type`),
      document: create.namedTypeReference(`${FormatCollectionName(includeDBName ? `${dbName}${result.name}` : result.name)}Document`)
    };
    registerRelationship({ key: attribute.key, value: isMany ? type.array(reference.document) : reference.document, required: attribute.required === false });
    return create.property(attribute.key, (isMany ? type.array(reference.type) : reference.type), attribute.required === false && DeclarationFlags.Optional);
  }

  // handle enums
  if(attribute.format === 'enum') {
    const EnumName = `${typeIntfName}${attribute.key.charAt(0).toUpperCase() + attribute.key.slice(1)}`;
    const EnumType = create.enum(EnumName, false, DeclarationFlags.Export);

    attribute.elements.forEach((element: string) => {
      EnumType.members.push(create.enumValue(`"${element}"`, element));
    });
    writeStream.write(emit(EnumType));

    return create.property(attribute.key, create.namedTypeReference(EnumName), attribute.required === false && DeclarationFlags.Optional);
  }

  // handle url
  if (attribute.format && attribute.format === 'url') {
    if(hardTypes) {
      return create.property(attribute.key, create.namedTypeReference('URL'), attribute.required === false && DeclarationFlags.Optional);
    }
    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle email
  if (attribute.format && attribute.format === 'email') {
    if(hardTypes) {
      return create.property(attribute.key, create.namedTypeReference('Email'), attribute.required === false && DeclarationFlags.Optional);
    }
    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle strings
  if (attribute.type === 'string') {
    return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional);
  }

  // handle arrays
  if (attribute.array === true) {
    return create.property(attribute.key, type.array(type.any), attribute.required === false && DeclarationFlags.Optional);
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

export default GenerateType;
