import { create, emit, DeclarationFlags } from 'dts-dom';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import findType from './utils/findType.js';
import { databasesClient } from './utils/appwrite.js';
import consola from "consola";
consola.wrapAll();
/**
 *
 * @param outDir The directory to output the types to. Defaults to "./types"
 * @param includeDBName Should exported interfaces include the database name as prefix? Defaults to false
 */
const FetchNewTypes = async ({ outDir = './types', includeDBName = false } = {}) => {
    // Create folder if non-existent
    if (!existsSync(outDir)) {
        mkdirSync(outDir);
    }
    // Empty the file
    const writeStream = createWriteStream(`${outDir}/appwrite.ts`);
    writeStream.write("");
    // Iterate over all databases & collections
    const { databases } = await databasesClient.list();
    consola.warn("All types are not actually handled. Some might return 'any' type. Please check the generated file and update the types manually. Check the documentation for more information.");
    for (const db of databases) {
        const { $id: databaseId, name: databaseName } = db;
        consola.start(`Fetching types for database "${db.name}"...`);
        const { collections } = await databasesClient.listCollections(databaseId);
        for (const col of collections) {
            const { $id: collectionId, name: collectionName } = col;
            consola.start(`Fetching types for collection "${col.name}"...`);
            // Create interface
            const intfName = includeDBName ? `${databaseName}${collectionName}` : collectionName;
            const intf = create.interface(intfName, DeclarationFlags.Export);
            const { attributes } = await databasesClient.listAttributes(databaseId, collectionId);
            for (const attr of attributes) {
                const attribute = JSON.parse(JSON.stringify(attr));
                // Push attribute to interface
                intf.members.push(findType(attribute, outDir, intfName));
            }
            // Write interface to file
            const writeStream = createWriteStream(`${outDir}/appwrite.ts`, { flags: 'a' });
            writeStream.write(emit(intf));
            consola.success(`Types for collection "${col.name}" fetched successfully`);
        }
        consola.success(`Types for database "${db.name}" fetched successfully`);
    }
    consola.success('All types fetched successfully');
    return 'file generated successfully';
};
await FetchNewTypes();
export { FetchNewTypes };
