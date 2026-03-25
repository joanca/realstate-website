import { describe, expect, it } from 'vitest';
import { getShadowStylesheetHref, resolveIsViteDev } from './getShadowStylesheetHref';

describe('resolveIsViteDev', () => {
  it('returns true when vite env DEV is true', () => {
    expect(resolveIsViteDev({ DEV: true })).toBe(true);
  });

  it('returns false when vite env is unavailable', () => {
    expect(resolveIsViteDev(undefined)).toBe(false);
  });
});

describe('getShadowStylesheetHref', () => {
  it('returns local styles.css URL in vite dev mode', () => {
    const href = getShadowStylesheetHref({
      isViteDev: true,
      baseUrl: 'https://example.com/src/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('https://example.com/styles.css');
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

  it('returns local styles.css URL with relative path resolution', () => {
    const href = getShadowStylesheetHref({
      isViteDev: true,
      baseUrl: 'http://localhost:3000/src/modules/styles/getShadowStylesheetHref.ts',
    });

    expect(href).toBe('http://localhost:3000/styles.css');
  });
});
