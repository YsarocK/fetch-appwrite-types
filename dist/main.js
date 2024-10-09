import { create, emit, DeclarationFlags } from 'dts-dom';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import consola from "consola";
import GenerateType from './utils/GenerateType.js';
import FormatCollectionName from './utils/FormatCollectionName.js';
import { databasesClient } from './utils/appwrite.js';
import CreateHardFieldsTypes from "./utils/CreateHardFieldsTypes.js";
consola.wrapAll();
/**
 *
 * @param outDir The directory to output the types to. Defaults to "./types"
 * @param includeDBName Should exported interfaces include the database name as prefix? Defaults to false
 * @param hardTypes Email & URL strongly-typed. See doc for more. Defaults to false
 */
const FetchNewTypes = async ({ outDir = './types', outFileName = "appwrite", includeDBName = false, hardTypes = false } = {}) => {
    if (!existsSync(outDir)) {
        mkdirSync(outDir);
    }
    const packagesInstalled = {
        server: false,
        client: false
    };
    try {
        import.meta.resolve('node-appwrite');
        packagesInstalled.server = true;
    }
    catch (e) {
        consola.warn('"node-appwrite" package is not installed. Trying to use the client package"');
        try {
            import.meta.resolve('appwrite');
            consola.warn('"appwrite" package is installed. Using it instead');
            packagesInstalled.client = true;
        }
        catch (e) {
            consola.error('"appwrite" package is not installed. Please install it to continue');
            return;
        }
    }
    // Empty the file
    const writeStream = createWriteStream(`${outDir}/${outFileName}.ts`);
    writeStream.write(`import { Models } from '${packagesInstalled.server ? 'node-appwrite' : 'appwrite'}';\n\n`);
    if (hardTypes) {
        CreateHardFieldsTypes(`${outDir}/${outFileName}.ts`);
    }
    const { databases } = await databasesClient.list();
    consola.warn("All types are not actually handled. Some might return 'any' type. Please check the generated file and update the types manually. Check the documentation for more information.");
    for (const db of databases) {
        const { $id: databaseId, name: databaseName } = db;
        consola.start(`Fetching types for database "${db.name}"...`);
        const { collections } = await databasesClient.listCollections(databaseId);
        for (const col of collections) {
            const { $id: collectionId, name } = col;
            consola.start(`Fetching types for collection "${name}"...`);
            const collectionName = `${FormatCollectionName(includeDBName ? `${databaseName}${name}` : name)}`;
            // Create type interface
            const typeIntfName = `${collectionName}Type`;
            const typeIntf = create.interface(typeIntfName, DeclarationFlags.Export);
            const res = await databasesClient.listAttributes(databaseId, collectionId);
            const attributes = JSON.parse(JSON.stringify(res.attributes));
            const relationships = [];
            for (const attr of attributes) {
                // Push attribute to interface
                typeIntf.members.push(await GenerateType(attr, outDir, typeIntfName, hardTypes, includeDBName, databaseName, databaseId, (params) => relationships.push(params)));
            }
            // Write type interface to file
            const writeStream = createWriteStream(`${outDir}/${outFileName}.ts`, { flags: 'a' });
            writeStream.write(emit(typeIntf));
            // Create document interface
            const documentIntfName = `${collectionName}Document `;
            const documentIntf = create.interface(documentIntfName, DeclarationFlags.Export);
            documentIntf.baseTypes = [typeIntf, create.namedTypeReference('Models.Document')];
            relationships.forEach((relationship) => {
                documentIntf.members.push(create.property(relationship.key, relationship.value, relationship.required === false && DeclarationFlags.Optional));
            });
            // Write document interface to file
            writeStream.write(emit(documentIntf));
            consola.success(`Types for collection "${col.name}" fetched successfully`);
        }
        consola.success(`Types for database "${db.name}" fetched successfully`);
    }
    consola.success('All types fetched successfully');
    return 'File generated successfully';
};
export { FetchNewTypes };
