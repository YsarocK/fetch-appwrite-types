/**
 * 
 * @param colName The name of the collection
 * @returns The name of the collection, without "-" and with the first letter capitalized
 */
const FormatCollectionName = (str: string): string => {
  const formattedString = str.replace(/-([a-z])/gi, (match, nextChar) => nextChar.toUpperCase());

  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};

export default FormatCollectionName;
