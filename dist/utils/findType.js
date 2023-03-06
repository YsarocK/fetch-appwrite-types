import { type } from 'dts-dom';
/**
 *
 * @param value
 * @returns The type (dts-dom) of the value
 */
const findType = (attribute) => {
    // handle null values
    if (attribute.type === null) {
        return type.null;
    }
    // handle strings
    if (attribute.type === 'string') {
        return type.string;
    }
    // handle arrays
    if (attribute.array === true) {
        return type.array(type.any);
    }
    // handle email
    if (attribute.format && attribute.format === 'email') {
        return type.string;
    }
    // handle integer & double
    if (attribute.type === 'integer' || attribute.type === 'double') {
        return type.number;
    }
    // handle boolean
    if (attribute.type === 'boolean') {
        return type.boolean;
    }
    return type.any;
};
export default findType;
