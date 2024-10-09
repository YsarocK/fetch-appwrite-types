import type { Attribute } from '../types/index.js';
/**
 *
 * @param attribute The attribute to find the type of
 * @param outDir The directory to output the types to
 * @param typeIntfName The name of the interface
 * @returns The type (dts-dom) of the value
 */
declare const GenerateType: (attribute: Attribute, outDir: string, typeIntfName: string, hardTypes: boolean, includeDBName: boolean, dbName: string) => import("dts-dom").PropertyDeclaration;
export default GenerateType;
