import { ArrayTypeReference, NamedTypeReference } from 'dts-dom';
import type { Attribute } from '../types/index.js';
import { WriteStream } from "fs";
/**
 *
 * @param attribute The attribute to find the type of
 * @param outDir The directory to output the types to
 * @param typeIntfName The name of the interface
 * @returns The type (dts-dom) of the value
 */
interface registerRelationship {
    (params: {
        key: string;
        value: NamedTypeReference | ArrayTypeReference;
        required: boolean;
    }): void;
}
declare const GenerateType: (attribute: Attribute, writeStream: WriteStream, typeIntfName: string, hardTypes: boolean, includeDBName: boolean, dbName: string, dbId: string, registerRelationship: registerRelationship) => Promise<import("dts-dom").PropertyDeclaration>;
export default GenerateType;
