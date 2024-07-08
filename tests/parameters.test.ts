import { FetchNewTypes } from '../dist/main.js';
import { existsSync, readFile, unlink } from 'fs';
import { promisify } from 'util';
import { FetchParameters } from '../dist/types/FetchParameters.js';

const readFileAsync = promisify(readFile);
const unlinkAsync = promisify(unlink);

const deleteFile = async (path: string) => {
  if (existsSync(path)) {
    try {
      await unlinkAsync(path);
    } catch (err) {
      console.error(err);
    }
  }
};

let defaultParams: FetchParameters = {
  outDir: './types',
  outFileName: "appwrite",
  includeDBName: false,
  hardTypes: false
};

describe('fetchAppwriteTypes parameters', () => {
  it('should have created the type file in a "custom-folder" folder', async () => {
    const params: FetchParameters = {
      outDir: './custom-folder',
      ...defaultParams
    };
  
    const filePath = `${params.outDir}/${params.outFileName}.ts`;
    
    await FetchNewTypes(params);

    let fileContent: string | undefined = undefined;
    try {
      fileContent = await readFileAsync(filePath, 'utf8');
    } catch (err) {
      console.error(err);
    }

    expect(fileContent).toBeDefined();

    await deleteFile(filePath);
  });
  
  it('should have created the type file in a with the name "custom-filename"', async () => {
    const params: FetchParameters = {
      outFileName: './custom-filename',
      ...defaultParams
    };
  
    const filePath = `${params.outDir}/${params.outFileName}.ts`;
    
    await FetchNewTypes(params);

    let fileContent: string | undefined = undefined;
    try {
      fileContent = await readFileAsync(filePath, 'utf8');
    } catch (err) {
      console.error(err);
    }

    expect(fileContent).toBeDefined();

    await deleteFile(filePath);
  });
});
