import { fetchNewTypes } from '../dist/main';
import { existsSync, readFileSync, rmdirSync } from 'fs';

if (existsSync('./types')) {
  rmdirSync('./types', { recursive: true });
}
const res = await fetchNewTypes();
await fetchNewTypes({ outDir: './types/custom', includeDBName: true });

describe('fetchNewTypes generation tests', () => {
  it('should be called', () => {
    expect(res).toBe('file generated successfully');
  });

  it('should have generated file in default location', () => {
    expect(existsSync('./types/appwrite.ts')).toBe(true);
  });

  it('should have generated file in custom location', () => {
    expect(existsSync('./types/custom/appwrite.ts')).toBe(true);
  });
});

describe('fetchNewTypes results tests', () => {
  it('should generate the correct content', async () => {
    // Await for files to be generated
    await new Promise((r) => setTimeout(r, 200));

    const expectedResult = `export interface Clients {\r\n    slug?: string;\r\n    full_name?: string;\r\n    job_title?: string;\r\n    stats?: string;\r\n    settings?: string;\r\n    description?: string;\r\n    userId: string;\r\n    email: string;\r\n    profile: string;\r\n}\r\n\r\nexport interface Romans {\r\n    author?: string;\r\n    date?: any;\r\n    age?: number;\r\n    isAdmin?: boolean;\r\n}\r\n\r\n`;
    const file = readFileSync('./types/appwrite.ts', 'utf-8');
    expect(file).toBe(expectedResult);
  });

  it('should generate the correct content with DB name prefix', async () => {
    // Await for files to be generated
    await new Promise((r) => setTimeout(r, 200));

    const expectedResult = `export interface UsersClients {\r\n    slug?: string;\r\n    full_name?: string;\r\n    job_title?: string;\r\n    stats?: string;\r\n    settings?: string;\r\n    description?: string;\r\n    userId: string;\r\n    email: string;\r\n    profile: string;\r\n}\r\n\r\nexport interface BooksRomans {\r\n    author?: string;\r\n    date?: any;\r\n    age?: number;\r\n    isAdmin?: boolean;\r\n}\r\n\r\n`;
    const file = readFileSync('./types/custom/appwrite.ts', 'utf-8');
    expect(file).toBe(expectedResult);
  });
});