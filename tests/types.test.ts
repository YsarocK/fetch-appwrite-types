import { describe, expect, test, afterAll, beforeEach } from 'vitest';
import { FetchNewTypes } from '../dist/main.js';
import { existsSync, readdirSync, readFileSync, unlinkSync, rmSync } from 'fs';
import path from 'path';
import cleanupFile from './utils/cleanupFile';
import normalizeContent from './utils/normalizeContent';

const referenceFilePath = path.resolve(__dirname, './models/default.ts');
const referenceFilePathHardTypes = path.resolve(__dirname, './models/hardTypes.ts');
const referenceFilePathIncludeDbName = path.resolve(__dirname, './models/dbName.ts');

describe('types literal validation', () => {
  beforeEach(() => {
    const outDir = './types-validations';
    if (existsSync(outDir)) {
      readdirSync(outDir).forEach(file => unlinkSync(`${outDir}/${file}`));
    }
  });

  test('--default content validation', async () => {
    const outDir = './types-validations';
    const outFile = `${outDir}/test-generation-default.ts`;

    await FetchNewTypes({ outDir, outFileName: 'test-generation-default' });
    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePath, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  test('--with hardTypes content validation', async () => {
    const outDir = './types-validations';
    const outFile = `${outDir}/test-generation-hard-types.ts`;

    await FetchNewTypes({ outDir, outFileName: 'test-generation-hard-types', hardTypes: true });
    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePathHardTypes, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  test('--with dbName content validation', async () => {
    const outDir = './types-validations';
    const outFile = `${outDir}/test-generation-db-name.ts`;

    await FetchNewTypes({ outDir, outFileName: 'test-generation-db-name', includeDBName: true });
    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePathIncludeDbName, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  afterAll(() => {
    if (existsSync('./types-validations')) {
      readdirSync('./types-validations').forEach(file => unlinkSync(`./types-validations/${file}`));
      rmSync('./types-validations', { recursive: true, force: true });
    }
  });
});
