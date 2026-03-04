import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { setupEmbeddedFixture } from './test/utils/embeddedFixture';

function isLocalhostRuntime() {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

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

  it('creates a light-DOM listings portal after #emily-realestate and triggers legacy widget loader', async () => {
    const { mountNode } = setupEmbeddedFixture();
    const triggerSpy = vi.fn();
    const jqueryMock = vi.fn(() => ({ trigger: triggerSpy }));
    (jqueryMock as typeof jqueryMock & { fn: { CreatePanelSlider: () => void } }).fn = {
      CreatePanelSlider: () => {},
    };

    (window as Window & { jQuery?: typeof jqueryMock }).jQuery = jqueryMock;
    (window as Window & { WMS?: { propertycards?: { SearchCardProcess?: () => void } } }).WMS = {
      propertycards: {
        SearchCardProcess: () => {},
      },
    };

    const { unmount } = render(<App />, { container: mountNode });

    await waitFor(() => {
      const portalNode = document.getElementById('emily-realestate-listings');
      expect(portalNode).toBeInTheDocument();
      expect(mountNode.nextElementSibling).toBe(portalNode);

      const widgetNode = portalNode?.querySelector('[data-get-widget]');
      expect(widgetNode).toBeInTheDocument();
      expect(widgetNode).toHaveAttribute('data-target-parent', 'yes');
      expect(widgetNode).toHaveAttribute('data-widget-check', '[data-propcard-listing-id]');

      const widgetConfig = JSON.parse(widgetNode?.getAttribute('data-get-widget') ?? '{}');
      expect(widgetConfig.class).toBe('featuredproperties');
      expect(widgetConfig.data?.list).toBe('1175939');
    });

    await waitFor(() => {
      expect(triggerSpy).toHaveBeenCalledWith('flbuilder-render-updated');
    });

    unmount();

    await waitFor(() => {
      expect(document.getElementById('emily-realestate-listings')).not.toBeInTheDocument();
    });
  });

  it('uses localhost services proxy base in dev and restores body site base on unmount', async () => {
    const { mountNode } = setupEmbeddedFixture();
    const triggerSpy = vi.fn();
    const jqueryMock = vi.fn(() => ({ trigger: triggerSpy }));
    (jqueryMock as typeof jqueryMock & { fn: { CreatePanelSlider: () => void } }).fn = {
      CreatePanelSlider: () => {},
    };

    const originalSiteBaseLang = 'https://emilybrealty.com';
    document.body.setAttribute('data-sitebase-lang', originalSiteBaseLang);
    (window as Window & { jQuery?: typeof jqueryMock }).jQuery = jqueryMock;
    (window as Window & { WMS?: { propertycards?: { SearchCardProcess?: () => void } } }).WMS = {
      propertycards: {
        SearchCardProcess: () => {},
      },
    };

    const { unmount } = render(<App />, { container: mountNode });

    await waitFor(() => {
      const expectedSiteBaseLang = isLocalhostRuntime() ? window.location.origin : originalSiteBaseLang;
      expect(document.body.getAttribute('data-sitebase-lang')).toBe(expectedSiteBaseLang);
    });

    unmount();

    await waitFor(() => {
      expect(document.body.getAttribute('data-sitebase-lang')).toBe(originalSiteBaseLang);
    });
  });
});
