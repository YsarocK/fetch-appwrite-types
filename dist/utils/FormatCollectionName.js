/**
 *
 * @param colName The name of the collection
 * @returns The name of the collection, without "-" and with the first letter capitalized
 */
const FormatCollectionName = (str) => {
    return str.replace(/-([a-z])/gi, (match, nextChar) => nextChar.toUpperCase());
};
export default FormatCollectionName;
