/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */
declare const findType: (value: any) => import("dts-dom").ArrayTypeReference | import("dts-dom").PrimitiveType;
export default findType;
