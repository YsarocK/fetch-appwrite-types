import type { Attribute } from '../types/Attribute.js';
/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */
declare const findType: (attribute: Attribute, outDir: string, intfName: string) => import("dts-dom").PropertyDeclaration;
export default findType;
