import type { Attribute } from '../types/index.js';
/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */
declare const FindType: (attribute: Attribute, outDir: string, intfName: string) => import("dts-dom").PropertyDeclaration;
export default FindType;
