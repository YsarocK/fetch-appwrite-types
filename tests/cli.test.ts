import { describe, expect, test, afterAll, beforeEach } from 'vitest';
import { existsSync, readdirSync, readFileSync, unlinkSync, rmSync } from 'fs';
import path from 'path';
import cleanupFile from './utils/cleanupFile';
import normalizeContent from './utils/normalizeContent';
import { execa } from 'execa';

const referenceFilePath = path.resolve(__dirname, './models/default.ts');
const referenceFilePathHardTypes = path.resolve(__dirname, './models/hardTypes.ts');
const referenceFilePathIncludeDbName = path.resolve(__dirname, './models/dbName.ts');

describe('cli args', () => {
  beforeEach(() => {
    const outDir = './cli';
    if (existsSync(outDir)) {
      readdirSync(outDir).forEach(file => unlinkSync(`${outDir}/${file}`));
    }
  });

  test('--default content validation', async () => {
    const outDir = './cli';
    const outFile = `${outDir}/appwrite.ts`;

    await execa('sh', ['-c', 'cd ../'], { shell: true });
    await execa('node', ['dist/bin/index.js', 'outDir', outDir]);

    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePath, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  test('--default content validation in custom folder', async () => {
    const outDir = './cli-custom';
    const outFile = `${outDir}/cli-default.ts`;

    await execa('sh', ['-c', 'cd ../'], { shell: true });
    await execa('node', ['dist/bin/index.js', 'outDir', outDir, 'outFileName', 'cli-default']);

    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePath, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  test('--default content validation with custom filename', async () => {
    const outDir = './cli';
    const outFile = `${outDir}/cli-default-custom-name.ts`;

    await execa('sh', ['-c', 'cd ../'], { shell: true });
    await execa('node', ['dist/bin/index.js', 'outDir', outDir, 'outFileName', 'cli-default-custom-name']);

    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePath, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  test('--content validation with hardTypes', async () => {
    const outDir = './cli';
    const outFile = `${outDir}/cli-default-hard-types.ts`;

    await execa('sh', ['-c', 'cd ../'], { shell: true });
    await execa('node', ['dist/bin/index.js', 'outDir', outDir, 'outFileName', 'cli-default-hard-types', 'hardTypes']);

    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePathHardTypes, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  test('--content validation with dbName', async () => {
    const outDir = './cli';
    const outFile = `${outDir}/cli-default-db-names.ts`;

    await execa('sh', ['-c', 'cd ../'], { shell: true });
    await execa('node', ['dist/bin/index.js', 'outDir', outDir, 'outFileName', 'cli-default-db-names', 'includeDBName']);

    const generatedContent = normalizeContent(readFileSync(outFile, 'utf-8'));
    const referenceContent = normalizeContent(readFileSync(referenceFilePathIncludeDbName, 'utf-8'));

    expect(generatedContent).toBe(referenceContent);
    cleanupFile(outFile);
  });

  afterAll(() => {
    ['./cli', './cli-custom'].forEach(dir => {
      if (existsSync(dir)) {
        readdirSync(dir).forEach(file => unlinkSync(`${dir}/${file}`));
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });
});
