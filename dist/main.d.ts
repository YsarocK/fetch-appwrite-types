import type { FetchParameters } from "./types/index.js";
/**
 *
 * @param outDir The directory to output the types to. Defaults to "./types"
 * @param includeDBName Should exported interfaces include the database name as prefix? Defaults to false
 */
declare const FetchNewTypes: ({ outDir, includeDBName }?: FetchParameters) => Promise<string>;
export { FetchNewTypes };
