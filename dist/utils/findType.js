import { type } from 'dts-dom-custom';
/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */
const findType = (value) => {
    // handle null values
    if (value === null) {
        return type.null;
    }
    // handle arrays
    if (value instanceof Array) {
        return type.array(type.any);
    }
    // others types
    if (value) {
        const objType = typeof value;
        switch (objType) {
            case "bigint":
                return type.number;
            case "symbol":
                return type.undefined;
            case "function":
                return type.undefined;
            default:
                return type[objType];
        }
    }
    return type.any;
};
export default findType;
