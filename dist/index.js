import { create, emit, DeclarationFlags } from 'dts-dom';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import findType from './utils/findType.js';
import { databasesClient } from './utils/appwrite.js';
const fetchNewTypes = async (outDir) => {
    const dir = outDir || "./types";
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
    // Empty the file
    const writeStream = createWriteStream(`${dir}/appwrite.ts`);
    writeStream.write("");
    const { databases } = await databasesClient.list();
    for (const db of databases) {
        const databaseId = db.$id;
        console.log(`Fetching collection for database ${db.name}...`);
        const { collections } = await databasesClient.listCollections(databaseId);
        for (const col of collections) {
            const collectionId = col.$id;
            const collectionName = col.name;
            console.log(`Fetching types for collection ${col.name}...`);
            const intf = create.interface(collectionName, DeclarationFlags.Export);
            const { attributes } = await databasesClient.listAttributes(databaseId, collectionId);
            for (const attr of attributes) {
                const arrtObj = JSON.parse(JSON.stringify(attr));
                intf.members.push(create.property(arrtObj.key, findType(arrtObj.type), arrtObj.required === false && DeclarationFlags.Optional));
            }
            const writeStream = createWriteStream(`${dir}/appwrite.ts`, { flags: 'a' });
            writeStream.write(emit(intf));
        }
        ;
    }
};
export { fetchNewTypes };
