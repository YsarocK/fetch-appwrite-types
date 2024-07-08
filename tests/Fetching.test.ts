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

const normalizeContent = async (content: string) => {
  return content
    .split('\n')
    .map(line => line.trim())
    .join('\n');
}

describe('fetchAppwriteTypes', () => {
  const filePath = `./types/appwrite.ts`;

  beforeAll(async () => {
    await FetchNewTypes();
  });

  it('should have created the type file', async () => {
    let fileContent: string | undefined = undefined;
    try {
      fileContent = await readFileAsync(filePath, 'utf8');
    } catch (err) {
      console.error(err);
    }

    expect(fileContent).toBeDefined();
  });

  it('should have the correct content', async () => {
    const fileContent = await normalizeContent((await readFileAsync(filePath, 'utf8')).trim());
    const expectedContent = await normalizeContent(`export enum books_type {
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
    }
    `.trim());

    expect(fileContent).toBe(expectedContent);
  });

  afterAll(async () => {
    await deleteFile(filePath);
  });
});
