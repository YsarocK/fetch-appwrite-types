import { create, emit, DeclarationFlags } from 'dts-dom';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import consola from "consola";
import FindType from './utils/findType.js';
import { databasesClient } from './utils/appwrite.js';
import type { Attribute, FetchParameters } from "./types/index.js";
import CreateHardFieldsTypes from "./utils/CreateHardFieldsTypes.js";

consola.wrapAll();

/**
 * 
 * @param colName The name of the collection
 * @returns The name of the collection, without "-" and with the first letter capitalized
 */
const FormatCollectionName = (str: string): string => {
  return str.replace(/-([a-z])/gi, (match, nextChar) => nextChar.toUpperCase());
}


/**
 *
 * @param outDir The directory to output the types to. Defaults to "./types"
 * @param includeDBName Should exported interfaces include the database name as prefix? Defaults to false
 * @param hardTypes Email & URL strongly-typed. See doc for more. Defaults to false
 */
const FetchNewTypes = async ({ outDir = './types', outFileName = "appwrite", includeDBName = false, hardTypes = false }: FetchParameters = {}) => {
  // Create folder if non-existent
  if (!existsSync(outDir)) {
    mkdirSync(outDir);
  }

  // Empty the file
  const writeStream = createWriteStream(`${outDir}/${outFileName}.ts`);
  writeStream.write("");

  if (hardTypes) {
    CreateHardFieldsTypes(outDir);
  }

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
      const intfName = FormatCollectionName(includeDBName ? `${databaseName}${collectionName}` : collectionName);
      const intf = create.interface(intfName, DeclarationFlags.Export);

      const { attributes } = await databasesClient.listAttributes(databaseId, collectionId);

      for (const attr of attributes) {
        const attribute: Attribute = JSON.parse(JSON.stringify(attr));

        // Push attribute to interface
        intf.members.push(FindType(attribute, outDir, intfName, hardTypes, includeDBName, databaseName));
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

export { FetchNewTypes };
