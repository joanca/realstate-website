import { describe, expect, it } from 'vitest';
import { getShadowStylesheetHref } from './getShadowStylesheetHref';

describe('getShadowStylesheetHref', () => {
  it('returns local output.css URL in vite dev mode', () => {
    const href = getShadowStylesheetHref({
      isViteDev: true,
      baseUrl: 'https://example.com/src/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('https://example.com/output.css');
  });

  it('returns ESM proxy URL when isViteDev is false (start script)', () => {
    const href = getShadowStylesheetHref({
      isViteDev: false,
      baseUrl: 'https://example.com/src/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/output.css');
  });

  it('returns ESM proxy URL in production', () => {
    const href = getShadowStylesheetHref({
      isViteDev: false,
      baseUrl: 'https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/output.css');
  });

  it('returns local output.css URL with relative path resolution', () => {
    const href = getShadowStylesheetHref({
      isViteDev: true,
      baseUrl: 'http://localhost:3000/src/modules/styles/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('http://localhost:3000/output.css');
  });
});
