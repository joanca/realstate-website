import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setupEmbeddedFixture } from './test/utils/embeddedFixture.js';

describe('main shadow mount', () => {
  it('renders app in shadow root and keeps host stylesheets intact', async () => {
    const { mountNode } = setupEmbeddedFixture();

    await import('./main.jsx');

    const shadowRoot = mountNode.shadowRoot;
    expect(shadowRoot).toBeTruthy();

    const globalFonts = document.getElementById('emily-global-fonts');
    expect(globalFonts).toBeInTheDocument();
    expect(globalFonts?.textContent).toContain('@font-face');
    expect(globalFonts?.textContent).toContain("font-family: 'Work Sans'");

    expect(shadowRoot.querySelector('#emily-shadow-base')).toBeInTheDocument();
    expect(shadowRoot.querySelector('#emily-shadow-stylesheet')).toBeInTheDocument();
    expect(shadowRoot.querySelector('#emily-shadow-app')).toBeInTheDocument();

    const baseStyleText = shadowRoot.querySelector('#emily-shadow-base')?.textContent ?? '';
    expect(baseStyleText).toContain('all: initial;');
    expect(baseStyleText).toContain('contain: layout style paint;');
    expect(baseStyleText).toContain('isolation: isolate;');

    await waitFor(() => {
      expect(shadowRoot.textContent).toContain("I'm EMILY,");
    });

    expect(document.getElementById('dashicons-css')).toBeInTheDocument();
    expect(document.getElementById('admin-bar-css')).toBeInTheDocument();
    expect(document.getElementById('mx_0-css')).toBeInTheDocument();
    expect(document.getElementById('mx_1-css')).toBeInTheDocument();
    expect(document.getElementById('app-styles')).toBeInTheDocument();
  });
});
