import { FetchNewTypes } from '../dist/main.js';
import { createWriteStream, existsSync, readFile } from 'fs';

describe('fetchAppwriteTypes', () => {
  it('should return types from Appwrite server', async () => {
    const params = {
      outDir: './types',
      outFileName: "appwrite",
      includeDBName: false,
      hardTypes: false
    };

    await FetchNewTypes();

    const file = readFile('./types/appwrite.ts', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      
      expect(file).toBe(
      `export enum books_type {
          bd = "bd",
          roman = "roman",
          manga = "manga",
      }

      export interface books {
          name: string;
          type?: books_type;
          date?: string;
          email?: string;
          url?: string;
      }

      export interface others {
          Xdrdh?: number;
          books?: books;
      }`);
    });
    
    if (existsSync(params.outDir)) {
      const writeStream = createWriteStream(`${params.outDir}/${params.outFileName}.ts`);
      writeStream.write("");
    }
  })
});