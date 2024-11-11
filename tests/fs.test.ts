import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { FetchNewTypes } from '../src/main';
import { existsSync, readdirSync, rmSync, unlinkSync } from 'fs';

const initialOutDir = './types';
const initialFileName = `appwrite`;
const newOutDir = './newTypes';
const newOutFileName = `customFile`;

describe('FetchNewTypes Function', () => {
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
    // if (existsSync(newOutDir)) {
    //   readdirSync(newOutDir).forEach(file => unlinkSync(`${newOutDir}/${file}`));
    //   rmSync(newOutDir, { recursive: true, force: true });
    // }

    // if (existsSync(initialOutDir)) {
    //   readdirSync(initialOutDir).forEach(file => unlinkSync(`${initialOutDir}/${file}`));
    //   rmSync(initialOutDir, { recursive: true, force: true });
    // }
  });
});
