import { describe, expect, test, afterAll } from 'vitest';
import { FetchNewTypes } from '../dist/main.js';
import { existsSync, readdirSync, unlinkSync, mkdirSync, rmSync } from 'fs';
import cleanupFile from './utils/cleanupFile';

describe('file generation', () => {
  test('--should generate a file in ./types/test-generation-default.ts', async () => {
    const outDir = './types';
    const outFile = `${outDir}/test-generation-default.ts`;

    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    await FetchNewTypes({ outDir, outFileName: 'test-generation-default', includeDBName: false, hardTypes: false });
    expect(existsSync(outFile)).toBe(true);
    cleanupFile(outFile);
  });

  test('--should generate a file in ./customFolder directory', async () => {
    const outDir = './customFolder';
    const outFile = `${outDir}/test-generation-default.ts`;

    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    await FetchNewTypes({ outDir, outFileName: 'test-generation-default', includeDBName: false, hardTypes: false });
    expect(existsSync(outFile)).toBe(true);
    cleanupFile(outFile);
  });

  test('--should generate a file with the name customFile.ts', async () => {
    const outDir = './types';
    const outFile = `${outDir}/customFile.ts`;

    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    await FetchNewTypes({ outDir, outFileName: 'customFile', includeDBName: false, hardTypes: false });
    expect(existsSync(outFile)).toBe(true);
    cleanupFile(outFile);
  });

  afterAll(() => {
    ['test-output', 'types', 'customFolder'].forEach(dir => {
      if (existsSync(dir)) {
        readdirSync(dir).forEach(file => unlinkSync(`${dir}/${file}`));
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });
});