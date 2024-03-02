import { create, DeclarationFlags, emit, type } from 'dts-dom';
import { createWriteStream } from "fs";
/**
 *
 * @param attribute The attribute to find the type of
 * @param outDir The directory to output the types to
 * @param intfName The name of the interface
 * @returns The type (dts-dom) of the value
 */
const FindType = (attribute, outDir, intfName, hardTypes, includeDBName, dbName) => {
    const writeStream = createWriteStream(`${outDir}/appwrite.ts`, { flags: 'a' });
    // handle null values
    if (attribute.type === null) {
        return create.property(attribute.key, type.null, attribute.required === false && DeclarationFlags.Optional);
    }
    // handle null values
    if (attribute.type === "datetime") {
        return create.property(attribute.key, create.namedTypeReference('Date'), attribute.required === false && DeclarationFlags.Optional);
    }
    // handle related collections
    if (attribute.relatedCollection) {
        return create.property(attribute.key, create.namedTypeReference(includeDBName ? `${dbName}${attribute.relatedCollection}` : attribute.relatedCollection), attribute.required === false && DeclarationFlags.Optional);
    }
    // handle enums
    if (attribute.format === 'enum') {
        const EnumName = `${intfName}_${attribute.key}`;
        const EnumType = create.enum(EnumName, false, DeclarationFlags.Export);
        attribute.elements.forEach((element) => {
            EnumType.members.push(create.enumValue(element, element));
        });
        writeStream.write(emit(EnumType));
        return create.property(attribute.key, create.namedTypeReference(EnumName), attribute.required === false && DeclarationFlags.Optional);
    }
    // handle email
    if (attribute.format && attribute.format === 'url') {
        if (hardTypes) {
            return create.property(attribute.key, create.namedTypeReference('URL'), attribute.required === false && DeclarationFlags.Optional);
        }
        return create.property(attribute.key, type.string, attribute.required === false && DeclarationFlags.Optional);
    }
    // handle email
    if (attribute.format && attribute.format === 'email') {
        if (hardTypes) {
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
export default FindType;
