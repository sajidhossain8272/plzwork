import { describe, it, expect } from 'vitest';
import { getBaseName } from './imageUtils';

describe('getBaseName', () => {
  it('should strip extension from standard filename', () => {
    expect(getBaseName('image.png')).toBe('image');
  });

  it('should handle multiple dots', () => {
    expect(getBaseName('archive.tar.gz')).toBe('archive.tar');
  });

  it('should handle no extension', () => {
    expect(getBaseName('README')).toBe('README');
  });

  it('should handle hidden files', () => {
    expect(getBaseName('.env')).toBe('');
  });

  it('should handle empty string', () => {
    expect(getBaseName('')).toBe('');
  });
});
