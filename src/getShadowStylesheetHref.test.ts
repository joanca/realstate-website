import { describe, expect, it } from 'vitest';
import { getShadowStylesheetHref } from './getShadowStylesheetHref';

describe('getShadowStylesheetHref', () => {
  it('returns local output.css URL in vite dev mode', () => {
    const href = getShadowStylesheetHref({
      isViteDev: true,
      hostname: 'production.example.com',
      baseUrl: 'https://example.com/src/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('https://example.com/src/output.css');
  });

  it('returns local output.css URL on localhost', () => {
    const href = getShadowStylesheetHref({
      isViteDev: false,
      hostname: 'localhost',
      baseUrl: 'https://example.com/src/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('https://example.com/src/output.css');
  });

  it('returns esm.sh URL in production', () => {
    const href = getShadowStylesheetHref({
      isViteDev: false,
      hostname: 'www.emily.example',
      baseUrl: 'https://example.com/src/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('https://esm.sh/gh/joanca/realstate-website@main/src/output.css');
  });
});
