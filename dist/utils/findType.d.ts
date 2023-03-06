import type { Attribute } from '../types/Attribute.js';
/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */
declare const findType: (attribute: Attribute) => import("dts-dom").ArrayTypeReference | import("dts-dom").PrimitiveType;
export default findType;
