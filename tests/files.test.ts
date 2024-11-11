import { describe, expect, test, beforeAll, afterAll, beforeEach } from 'vitest';
import { FetchNewTypes } from '../dist/main.js';
import { existsSync, readdirSync, readFileSync, rmSync, unlinkSync } from 'fs';
import path from 'path';

const initialOutDir = './types';
const initialFileName = `appwrite`;
const newOutDir = './newTypes';
const newOutFileName = `customFile`;

describe('file generation', () => {
  beforeAll(async () => {
    if (existsSync(initialOutDir)) {
      rmSync(initialOutDir, { recursive: true, force: true });
    }
    if (existsSync(newOutDir)) {
      rmSync(newOutDir, { recursive: true, force: true });
    }
  });

  test(`should generate a file in ${initialOutDir}/${initialFileName}.ts`, async () => {
    await FetchNewTypes({ outDir: initialOutDir, outFileName: initialFileName, includeDBName: false, hardTypes: false });
    expect(existsSync(`${initialOutDir}/${initialFileName}.ts`)).toBe(true);
  });

  test(`should generate a file in a ${newOutDir} directory`, async () => {
    await FetchNewTypes({ outDir: newOutDir, outFileName: initialFileName, includeDBName: false, hardTypes: false });
    expect(existsSync(`${newOutDir}/${initialFileName}.ts`)).toBe(true);
  });

  test(`should generate a file with the name ${newOutFileName}.ts`, async () => {
    await FetchNewTypes({ outDir: initialOutDir, outFileName: newOutFileName, includeDBName: false, hardTypes: false });
    expect(existsSync(`${initialOutDir}/${newOutFileName}.ts`)).toBe(true);
  });

  test(`should generate a file in a ${newOutDir} directory with the name ${newOutFileName}.ts`, async () => {
    await FetchNewTypes({ outDir: newOutDir, outFileName: newOutFileName, includeDBName: false, hardTypes: false });
    expect(existsSync(`${newOutDir}/${newOutFileName}.ts`)).toBe(true);
  });

  afterAll(() => {
    if (existsSync(newOutDir)) {
      readdirSync(newOutDir).forEach(file => unlinkSync(`${newOutDir}/${file}`));
      rmSync(newOutDir, { recursive: true, force: true });
    }

    if (existsSync(initialOutDir)) {
      readdirSync(initialOutDir).forEach(file => unlinkSync(`${initialOutDir}/${file}`));
      rmSync(initialOutDir, { recursive: true, force: true });
    }
  });
});

const referenceFilePath = path.resolve(__dirname, './models/default.ts');
const referenceFilePathHardTypes = path.resolve(__dirname, './models/hardTypes.ts');
const referenceFilePathIncludeDbName = path.resolve(__dirname, './models/dbName.ts');

const normalizeContent = (content: string) =>
  content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

describe('types literal validation', () => {
  beforeEach(async () => {
    if (existsSync(initialOutDir)) {
      readdirSync(initialOutDir).forEach(file => unlinkSync(`${initialOutDir}/${file}`));
      rmSync(initialOutDir, { recursive: true, force: true });
    }
  });

  test(`default`, async () => {
    await FetchNewTypes();
    const generatedContent = normalizeContent(readFileSync(`${initialOutDir}/${initialFileName}.ts`, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePath, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
  });

  test(`with hardTypes`, async () => {
    await FetchNewTypes({ hardTypes: true });
    const generatedContent = normalizeContent(readFileSync(`${initialOutDir}/${initialFileName}.ts`, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePathHardTypes, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
  });

  test(`with dbName`, async () => {
    await FetchNewTypes({ includeDBName: true });
    const generatedContent = normalizeContent(readFileSync(`${initialOutDir}/${initialFileName}.ts`, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePathIncludeDbName, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
  });
});
