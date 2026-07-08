import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { setupEmbeddedFixture } from './test/utils/embeddedFixture';

describe('App embedded integration', () => {
  it('reveals the full page on first mount by clearing preload lock markers', async () => {
    const { mountNode } = setupEmbeddedFixture();

    document.documentElement.setAttribute('data-emily-loading', 'true');
    const preloadStyle = document.createElement('style');
    preloadStyle.id = 'emily-preload-hide';
    preloadStyle.textContent = 'html[data-emily-loading="true"] body { visibility: hidden; }';
    document.head.appendChild(preloadStyle);

    render(<App />, { container: mountNode });

    await waitFor(() => {
      expect(document.documentElement).not.toHaveAttribute('data-emily-loading');
      expect(document.getElementById('emily-preload-hide')).not.toBeInTheDocument();
    });
  });

  it('mounts safely when preload lock markers are not present', async () => {
    const { mountNode } = setupEmbeddedFixture();

    render(<App />, { container: mountNode });

    await waitFor(() => {
      expect(document.documentElement).not.toHaveAttribute('data-emily-loading');
      expect(document.getElementById('emily-preload-hide')).not.toBeInTheDocument();
      expect(document.getElementById('react-root')).toBeInTheDocument();
    });
  });

  it('normalizes embedded wrapper structure after hydration', async () => {
    const { mountNode } = setupEmbeddedFixture();

    render(<App />, { container: mountNode });

    await waitFor(() => {
      const wrapper = document.getElementById('wrapper');
      const reactRoot = document.getElementById('react-root');
      const main = document.querySelector('main#emily-realestate');
      const pushFooter = document.querySelector('.push-footer');
      const customFooter = document.querySelector('.custom-footer');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper).not.toHaveAttribute('class');
      expect(reactRoot).toBeInTheDocument();
      expect(reactRoot).not.toHaveAttribute('class');
      expect(main?.parentElement).toBe(reactRoot);
      expect(reactRoot?.children).toHaveLength(1);
      expect(customFooter?.previousElementSibling).toBe(pushFooter);
    });
  });

  it('does not remove external stylesheets from host document', async () => {
    const { mountNode } = setupEmbeddedFixture();

    expect(document.getElementById('dashicons-css')).toBeInTheDocument();
    expect(document.getElementById('admin-bar-css')).toBeInTheDocument();
    expect(document.getElementById('mx_0-css')).toBeInTheDocument();
    expect(document.getElementById('mx_1-css')).toBeInTheDocument();
    expect(document.getElementById('app-styles')).toBeInTheDocument();

    render(<App />, { container: mountNode });

    await waitFor(() => {
      expect(document.getElementById('dashicons-css')).toBeInTheDocument();
      expect(document.getElementById('admin-bar-css')).toBeInTheDocument();
      expect(document.getElementById('mx_0-css')).toBeInTheDocument();
      expect(document.getElementById('mx_1-css')).toBeInTheDocument();
      expect(document.getElementById('app-styles')).toBeInTheDocument();
    });
  });

  it('does not mount the legacy listings portal on the homepage', async () => {
    const { mountNode } = setupEmbeddedFixture();

    render(<App />, { container: mountNode });

    await waitFor(() => {
      expect(document.querySelector('main#emily-realestate')).toBeInTheDocument();
      expect(document.getElementById('emily-realestate-listings')).not.toBeInTheDocument();
    });
  });

  it('leaves host body site base untouched on the homepage', async () => {
    const { mountNode } = setupEmbeddedFixture();
    const originalSiteBaseLang = 'https://emilybrealty.com';
    document.body.setAttribute('data-sitebase-lang', originalSiteBaseLang);

    const { unmount } = render(<App />, { container: mountNode });

    await waitFor(() => {
      expect(document.querySelector('main#emily-realestate')).toBeInTheDocument();
      expect(document.body.getAttribute('data-sitebase-lang')).toBe(originalSiteBaseLang);
    });

    unmount();

    await waitFor(() => {
      expect(document.body.getAttribute('data-sitebase-lang')).toBe(originalSiteBaseLang);
    });
  });
});
