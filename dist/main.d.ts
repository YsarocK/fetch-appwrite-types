interface fetchParameters {
    outDir?: string;
    includeDBName?: boolean;
}
/**
 *
 * @param outDir The directory to output the types to. Defaults to "./types"
 * @param includeDBName Should exported interfaces include the database name as prefix? Defaults to false
 */
declare const fetchNewTypes: ({ outDir, includeDBName }?: fetchParameters) => Promise<string>;
export { fetchNewTypes };
