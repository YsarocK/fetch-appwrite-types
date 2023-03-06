import { create, emit, DeclarationFlags } from 'dts-dom';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import findType from './utils/findType.js';
import { databasesClient } from './utils/appwrite.js';
import { Attribute } from './types/Attribute.js';

interface fetchParameters { outDir?: string, includeDBName?: boolean }

/**
 * 
 * @param outDir The directory to output the types to. Defaults to "./types"
 * @param includeDBName Should exported interfaces include the database name as prefix? Defaults to false
 */
const fetchNewTypes = async ({ outDir = './types', includeDBName = false }: fetchParameters = {}) => {
  // Create folder if non-existent
  if (!existsSync(outDir)) {
    mkdirSync(outDir);
  }

  // Empty the file
  const writeStream = createWriteStream(`${outDir}/appwrite.ts`);
  writeStream.write("")

  // Iterate over all databases & collections
  const { databases } = await databasesClient.list();
  for (const db of databases) {
    const databaseId = db.$id;
    const databaseName = db.name;
    console.log(`Fetching collection for database ${db.name}...`)
    const { collections } = await databasesClient.listCollections(databaseId)
    for (const col of collections) {
      const collectionId = col.$id;
      const collectionName = col.name;
      console.log(`Fetching types for collection ${col.name}...`)

      // Create interface
      const intfName = includeDBName ? `${databaseName}${collectionName}` : collectionName
      const intf = create.interface(intfName, DeclarationFlags.Export);

      const { attributes } = await databasesClient.listAttributes(databaseId, collectionId)
      for (const attr of attributes) {
        const attribute: Attribute = JSON.parse(JSON.stringify(attr))
        // Push attribute to interface
        intf.members.push(create.property(attribute.key, findType(attribute), attribute.required === false && DeclarationFlags.Optional));
      }

      // Write interface to file
      const writeStream = createWriteStream(`${outDir}/appwrite.ts`, { flags: 'a' });
      writeStream.write(emit(intf))
    };
  }
}

export { fetchNewTypes }