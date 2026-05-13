import test from 'node:test';
import assert from 'node:assert';
import { getBaseName } from './imageUtils.ts';

test('getBaseName', async (t) => {
  await t.test('should strip extension from standard filename', () => {
    assert.strictEqual(getBaseName('image.png'), 'image');
  });

  await t.test('should handle multiple dots', () => {
    assert.strictEqual(getBaseName('archive.tar.gz'), 'archive.tar');
  });

  await t.test('should handle no extension', () => {
    assert.strictEqual(getBaseName('README'), 'README');
  });

  await t.test('should handle hidden files', () => {
    assert.strictEqual(getBaseName('.env'), '');
  });

  await t.test('should handle empty string', () => {
    assert.strictEqual(getBaseName(''), '');
  });
});
